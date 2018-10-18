'use strict';

const { ApolloServer } = require('apollo-server');
const elasticsearch = require('elasticsearch');

const schema = require('./schema');
const resolvers = require('./resolvers');
const { ES_ENDPOINT } = require('./utils/constants');

const DEFAULT_PORT = 4000;

const client = new elasticsearch.Client({
  host: ES_ENDPOINT,
  log: 'trace'
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    return {
      client
    };
  }
});

server.listen({ port: process.env.PORT || DEFAULT_PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
