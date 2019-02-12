const graphql = require('graphql');
const mongoose = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/book');
const {
    AuthorType,
    BookType
} = require('./queries');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (parent, args) => {
                let author = new Author({
                    _id: new mongoose.Types.ObjectId(),
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parent, args) => {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: '5bebe3af06888405e02e9337'
                });
                return book.save();
            }
        }
    }
});

module.exports = {
    Mutation
}