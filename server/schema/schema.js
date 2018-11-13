const graphql = require('graphql');
const query = require('./queries');
const mutation = require('./mutations');

const {
    GraphQLSchema
} = graphql;


module.exports = new GraphQLSchema({
    query: query.RootQuery,
    mutation: mutation.Mutation
});