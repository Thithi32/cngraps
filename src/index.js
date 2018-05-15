import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

require('dotenv').config();

import typeDefs from './schema'; // eslint-disable-line import/first
import resolvers from './resolvers'; // eslint-disable-line import/first
import models from './models'; // eslint-disable-line import/first
import { refreshTokens } from './auth'; // eslint-disable-line import/first

const { SECRET } = process.env;
const PORT = process.env.PORT || 5005;

const app = express();

// middleware that can be used to enable CORS
app.use(cors());

// JWT authentication tutorials:
// https://www.youtube.com/watch?v=eu2VJ9dtwiY
// https://www.youtube.com/watch?v=sVwD3xDoXbg
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

// middleware to add user to context
app.use(addUser);

// graphiql interface route
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
  }),
);

// GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// graphql API routes
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((req, res) => ({
    schema,
    context: {
      models,
      SECRET,
      user: req.user,
    },
    formatError(error) {
      if (error.message === 'Login obrigatório') res.status(401);
      return error;
    },
  })),
);

// Serve React app build
const client = path.join(__dirname, 'client/build');
app.use(express.static(client));

// Wrap the Express server
const ws = createServer(app);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({ // eslint-disable-line no-new
    execute,
    subscribe,
    schema,
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
