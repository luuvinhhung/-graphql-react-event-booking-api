import { APP_PORT, IN_PROD } from './config'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import express from 'express'

import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers/index'
import isAuth from './middleware/is-auth'
import cors from 'cors'

  ;(async () => {
  try {
    const app = express()

    app.use(bodyParser.json())
    // allow cross-ogirin req
    app.use(cors())

    // app.use((req, res, next) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*')
    //   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    //   if (req.method === 'OPTIONS') {
    //     return res.sendStatus(200)
    //   }
    //   next()
    // })

    app.use(isAuth)
    app.disable('x-powered-by')
    // process.env.MONGO_USER trong nodemon.json hoac su dung bien lun trong .env
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
      }@cluster0-utsdq.mongodb.net/test?retryWrites=true`
    )
    const server = new ApolloServer({
      // These will be defined for both new or existing servers
      typeDefs,
      resolvers,
      playground: IN_PROD
        ? false
        : {
          settings: {
            // HACK: customs editor playground: https://github.com/prisma/graphql-playground#usage
            'request.credentials': 'include',
            'editor.cursorShape': 'underline', // possible values: 'line', 'block', 'underline'
            'editor.theme': 'dark', // possible values: 'dark', 'light'
            'editor.fontSize': 16
          }
        },
      context: ({ req, res }) => ({ req, res })
    })
    server.applyMiddleware({ app, cors: false }) // app is from an existing express app
    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
