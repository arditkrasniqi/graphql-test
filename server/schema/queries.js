const graphql = require('graphql');
const { books, authors } = require('../dummy_data/data');
const Author = require('../models/Author');
const Book = require('../models/book');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
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
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return books.filter(book => parent.id === book.authorId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return books.filter((book) => {
                    return book.id == args.id
                })[0];
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return authors.filter((author) => {
                    return author.id === args.id
                })[0];
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                return authors;
            }
        }
    }
});

module.exports = {
    BookType,
    AuthorType,
    RootQuery
}