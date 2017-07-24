import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} from 'graphql'
import { resolver } from 'graphql-sequelize'
import models from './models'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'Then name of the user.'
    }
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
      user: {
        type: userType,
        args: {
          id: {
            description: 'id of the user',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: resolver(models.User)
      },

      users: {
        // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
        type: new GraphQLList(userType),
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
        resolve: resolver(models.User)
      },

            // Field for searching for a user by name
      userSearch: {
        type: new GraphQLList(userType),
        args: {
          query: {
            description: 'Fuzzy-matched name of user',
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve: resolver(models.User, {
                    // Custom `where` clause that fuzzy-matches user's name and
                    // alphabetical sort by username
          before: (findOptions, args) => {
            findOptions.where = {
              name: { $like: `%${args.query}%` },
            }
            findOptions.order = [['name', 'ASC']]
            return findOptions
          },
                    // Custom sort override for exact matches first
          after: (results, args) => results.sort((a, b) => {
            if (a.name === args.query) {
              return 1
            } else if (b.name === args.query) {
              return -1
            }

            return 0
          })
        })
      }

    }
  })
})

export default schema
