const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    field: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve:(parent, args) => {
                // code to get data from db
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});