const graphql = require('graphql');
const {books, authors} = require('../dummy_data/data');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve:(parent, args) => {
                return authors.filter(author => {
                    return author.id === parent.authorId
                })[0];
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve:(parent, args) => {
                return books.filter((book) => {
                    return book.id == args.id
                })[0];
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                return authors.filter((author) => {
                    return author.id === args.id
                })[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});