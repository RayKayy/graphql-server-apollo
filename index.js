const { ApolloServer, gql } = require('apollo-server');
const loadJsonFile = require('load-json-file');
const { typeDefs, resolvers } = require('./schemas/site.js');

console.log(typeDefs, resolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    data: await loadJsonFile('./data.json'),
  })
});

server.listen().then(({ url }) => { console.log('Listening on ', url)});