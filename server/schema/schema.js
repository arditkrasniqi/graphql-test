const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const books = [
    {id:"1",name:"book 1", genre:"action"},
    {id:"2",name:"book 2", genre:"sci-fi"}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve:(parent, args) => {
                // code to get data from db
                // return books[0];
                let b = books.filter((book) => {
                    return book.id == args.id
                })[0];
                return b
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});