import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} from 'graphql'
import { resolver } from 'graphql-sequelize'
import models from './models'

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
      hello: {
        type: GraphQLString,
        resolve () {
          return 'world'
        }
      },

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
        // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
        type: new GraphQLList(repoType),
        args: {
          // An arg with the key limit will automatically be converted to a limit on the target
          limit: {
            type: GraphQLInt
          },
          // An arg with the key order will automatically be converted to a order on the target
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(models.Repo)
      },

      // Field for searching for a user by name
      repoSearch: {
        type: new GraphQLList(repoType),
        args: {
          query: {
            description: 'Fuzzy-matched name of repo',
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve: resolver(models.Repo, {
          // Custom `where` clause that fuzzy-matches user's name and
          // alphabetical sort by username
          before: (findOptions, args) => {
            findOptions.where = {
              slug: { $like: `%${args.query}%` },
            }
            findOptions.order = [['slug', 'ASC']]
            return findOptions
          },
          // Custom sort override for exact matches first
          after: (results, args) => results.sort((a, b) => {
            if (a.slug === args.query) {
              return 1
            } else if (b.slug === args.query) {
              return -1
            }
            return 0
          })
        })
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
