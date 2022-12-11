require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const User = require('./models/user');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Connecting to:', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// Setup is now within a function.
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).populate('friends');
        return { currentUser };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(
    '/',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id).populate('friends');
          return { currentUser };
        }
      },
    }),
  );
  
  await server.start();
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
  });
};

start();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// startStandaloneServer(
//   server,
//   {
//     context: async ({ req }) => {
      // const auth = req ? req.headers.authorization : null;
      // console.log('auth:', auth);
      // if (auth && auth.toLowerCase().startsWith('bearer ')) {
      //   const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      //   console.log('decoding token!');
      //   const currentUser = await User.findById(decodedToken.id).populate('friends');
      //   return { currentUser };
      // }
//     },
//   },
//   { listen: { port: 4000 }})
//   .then(({ url }) => {
//     console.log(`Server ready at ${url}`);
//   }
// );
