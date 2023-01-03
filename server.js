const express = require('express')
const expressGraphQL= require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,  

} = require('graphql')
const app = express()

const authors = [
    { id: 1, name: 'James Clear'},
    { id: 2, name: 'J.K Rowling'},
    { id: 3, name: 'Brent Weeks'}
]

const books = [
    { id: 1, name: 'Atomic Habits', authorId: 1 },
    { id: 2, name: 'Harry Potter and Goblet of Fire', authorId: 2},
    { id: 3, name: 'Beyond the Shadows', authorId: 3}

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represent a book written by an author',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represent an author of a book',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: new GraphQLList(Booktype),
            description: 'List of All Books',
            resolve: () => books 
        },
        authors: {
            type: new GraphQLList(Booktype),
            description: 'List of All Authors',
            resolve: () => authors
    }
})
})
const schema = new GraphQLSchema({
    query: RootQueryType
}) 

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphql: true
}))
app.listen(5000., () => console.log('Server Running'))
