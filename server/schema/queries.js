const graphql = require('graphql');
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
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return Author.findById(parent.authorId);
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return Book.find({
                    authorId: parent.id
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                email: {
                    type: GraphQLString
                }
            },
            resolve: (parent, args) => {
                return Author.find({email: args.email});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                return Author.find();
            }
        }
    }
});

module.exports = {
    BookType,
    AuthorType,
    RootQuery
}