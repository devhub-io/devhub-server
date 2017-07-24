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

const repoType = new GraphQLObjectType({
  name: 'Repo',
  description: 'A repo',
  fields: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'slug'
    },
    title: {
      type: GraphQLString,
      description: 'title'
    },
    description: {
      type: GraphQLString,
      description: 'description'
    },
    language: {
      type: GraphQLString,
      description: 'language'
    },
    readme: {
      type: GraphQLString,
      description: 'readme'
    },
    homepage: {
      type: GraphQLString,
      description: 'homepage'
    },
    github: {
      type: GraphQLString,
      description: 'github'
    },
    stargazers_count: {
      type: GraphQLInt,
      description: 'stargazers_count'
    },
    trends: {
      type: GraphQLString,
      description: 'trends'
    },
    owner: {
      type: GraphQLString,
      description: 'owner'
    },
    repo: {
      type: GraphQLString,
      description: 'repo'
    },
    cover: {
      type: GraphQLString,
      description: 'cover'
    },
    document_url: {
      type: GraphQLString,
      description: 'document_url'
    },
  }
})

const developerType = new GraphQLObjectType({
  name: 'Developer',
  description: 'A developer',
  fields: {
    login: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'login'
    },
    name: {
      type: GraphQLString,
      description: 'name'
    },
    avatar_url: {
      type: GraphQLString,
      description: 'avatar_url'
    },
    public_repos: {
      type: GraphQLInt,
      description: 'public_repos'
    },
    public_gists: {
      type: GraphQLInt,
      description: 'public_gists'
    },
    followers: {
      type: GraphQLInt,
      description: 'followers'
    },
    following: {
      type: GraphQLInt,
      description: 'following'
    },
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      repo: {
        type: repoType,
        args: {
          slug: {
            description: 'slug of the repo',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: resolver(models.Repo)
      },

      repos: {
        type: new GraphQLList(repoType),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(models.Repo)
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
                id: id
              }
            })
          })
        }
      },

      developer: {
        type: developerType,
        args: {
          login: {
            description: 'login',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: resolver(models.Developer)
      },

      developers: {
        type: new GraphQLList(developerType),
        args: {
          limit: {
            type: GraphQLInt
          },
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(models.Developer)
      },
    }
  })
})

export default schema
