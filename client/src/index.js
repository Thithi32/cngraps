import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';

import Routes from './routes';

import './app.less';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
