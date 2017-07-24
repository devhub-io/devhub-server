import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from 'graphql'
import { resolver } from 'graphql-sequelize'
import models from './models'
import { search } from './sphinx'

const categoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category',
  fields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'slug',
    },
    title: {
      type: GraphQLString,
      description: 'title',
    },
  },
})

const collectionType = new GraphQLObjectType({
  name: 'Collection',
  description: 'A collection',
  fields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'slug',
    },
    title: {
      type: GraphQLString,
      description: 'title',
    },
    image: {
      type: GraphQLString,
      description: 'image',
    },
  },
})

const repoType = new GraphQLObjectType({
  name: 'Repo',
  description: 'A repo',
  fields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'slug',
    },
    title: {
      type: GraphQLString,
      description: 'title',
    },
    description: {
      type: GraphQLString,
      description: 'description',
    },
    language: {
      type: GraphQLString,
      description: 'language',
    },
    readme: {
      type: GraphQLString,
      description: 'readme',
    },
    homepage: {
      type: GraphQLString,
      description: 'homepage',
    },
    github: {
      type: GraphQLString,
      description: 'github',
    },
    stargazers_count: {
      type: GraphQLInt,
      description: 'stargazers_count',
    },
    trends: {
      type: GraphQLString,
      description: 'trends',
    },
    owner: {
      type: GraphQLString,
      description: 'owner',
    },
    repo: {
      type: GraphQLString,
      description: 'repo',
    },
    cover: {
      type: GraphQLString,
      description: 'cover',
    },
    document_url: {
      type: GraphQLString,
      description: 'document_url',
    },
  },
})

const developerType = new GraphQLObjectType({
  name: 'Developer',
  description: 'A developer',
  fields: {
    login: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'login',
    },
    name: {
      type: GraphQLString,
      description: 'name',
    },
    avatar_url: {
      type: GraphQLString,
      description: 'avatar_url',
    },
    public_repos: {
      type: GraphQLInt,
      description: 'public_repos',
    },
    public_gists: {
      type: GraphQLInt,
      description: 'public_gists',
    },
    followers: {
      type: GraphQLInt,
      description: 'followers',
    },
    following: {
      type: GraphQLInt,
      description: 'following',
    },
  },
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      category: {
        type: categoryType,
        args: {
          slug: {
            description: 'slug of the category',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: resolver(models.Category),
      },

      categories: {
        type: new GraphQLList(categoryType),
        args: {
          parent_id: {
            type: GraphQLInt,
          },
        },
        resolve: resolver(models.Category, {
          before: (findOptions, args, context) => {
            findOptions.where = {parent_id: args.parent_id}
            return findOptions
          },
        }),
      },

      repo: {
        type: repoType,
        args: {
          slug: {
            description: 'slug of the repo',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: resolver(models.Repo, {
          before: (findOptions, args, context) => {
            findOptions.where = {status: 1}
            return findOptions
          },
        }),
      },

      repos: {
        type: new GraphQLList(repoType),
        args: {
          limit: {
            type: GraphQLInt,
          },
          order: {
            type: GraphQLString,
          },
        },
        resolve: resolver(models.Repo, {
          before: (findOptions, args, context) => {
            findOptions.where = {status: 1}
            if (args.order) {
              findOptions.order = [[args.order, 'DESC']]
            }
            return findOptions
          },
        }),
      },

      search: {
        type: new GraphQLList(repoType),
        args: {
          query: {
            description: 'keyword',
            type: new GraphQLNonNull(GraphQLString),
          },
          page: {
            description: 'page',
            type: GraphQLInt,
          },
        },
        resolve (source, args) {
          return search(args.query, 'repos', args.page, 10).then(res => {
            let id = res.matches.map(i => {
              return i.id
            })
            return models.Repo.findAll({
              where: {
                id: id,
                status: 1,
              },
            })
          })
        },
      },

      developer: {
        type: developerType,
        args: {
          login: {
            description: 'login',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: resolver(models.Developer, {
          before: (findOptions, args, context) => {
            findOptions.where = {status: 1}
            return findOptions
          },
        }),
      },

      developers: {
        type: new GraphQLList(developerType),
        args: {
          limit: {
            type: GraphQLInt,
          },
          order: {
            type: GraphQLString,
          },
        },
        resolve: resolver(models.Developer, {
          before: (findOptions, args, context) => {
            findOptions.where = {status: 1}
            if (args.order) {
              findOptions.order = [[args.order, 'DESC']]
            }
            return findOptions
          },
        }),
      },

      recommendRepos: {
        type: new GraphQLList(repoType),
        args: {
          limit: {
            type: GraphQLInt,
          },
        },
        resolve: resolver(models.Repo, {
          before: (findOptions, args, context) => {
            findOptions.where = {
              status: 1,
              is_recommend: true,
            }
            findOptions.order = [['stargazers_count', 'DESC']]
            return findOptions
          },
        }),
      },

      collections: {
        type: new GraphQLList(collectionType),
        args: {
          limit: {
            type: GraphQLInt,
          },
        },
        resolve: resolver(models.Collection, {
          before: (findOptions, args, context) => {
            findOptions.where = {is_enable: 1}
            findOptions.order = [['sort', 'ASC']]
            return findOptions
          },
        }),
      },

      reposCount: {
        type: GraphQLInt,
        resolve () {
          return models.Repo.count()
        },
      },

      developersCount: {
        type: GraphQLInt,
        resolve () {
          return models.Developer.count()
        },
      },
    },
  }),
})

export default schema
