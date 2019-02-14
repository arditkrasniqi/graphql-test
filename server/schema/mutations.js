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
    GraphQLInt,
    GraphQLID,
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
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                let author = new Author({
                    _id: new mongoose.Types.ObjectId(),
                    name: args.name,
                    age: args.age,
                    email: args.email
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
                authorEmail: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (parent, args) => {
                const author = await Author.findOne({email: args.authorEmail});
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: author._id
                });
                return book.save();
            }
        }
    }
});

module.exports = {
    Mutation
}