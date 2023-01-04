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

const title = [
    { id: 1, name: 'Harry Potter and Goblet of Fire'},
    { id: 2, name: 'American Psycho'},
    { id: 3, name: 'The Blind Side'}
]

const actors = [
    { id: 1, name: 'Daniel Radcliffe', actorId: 1 },
    { id: 2, name: 'Christian Bale', actorId: 2},
    { id: 3, name: 'Sandra Bullock', actorId: 3}

]

const TitleType = new GraphQLObjectType({
    name: 'title',
    description: 'This tells a title',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        actorId: {type: GraphQLNonNull(GraphQLInt)},
        actor: {
            type: ActorType,
            resolve: (book) => {
                return actors.find(actor => actor.id === title.actorId)
            }
        }
    })
})
const ActorType = new GraphQLObjectType({
    name: 'Actor',
    description: 'This tells a actor of a title',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        actorsId: {type: GraphQLNonNull(GraphQLInt)},
        actors: {
            type: ActorType,
            resolve: (title) => {
                return actors.find(actors => actor.id === title.actorId)
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        titles: {
            type: new GraphQLList(Booktype),
            description: 'List of All titles'
            resolve: () => titles 
        },
        actors: {
            type: new GraphQLList(Booktype),
            description: 'List of All Actors',
            resolve: () => actors
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
app.listen(3000., () => console.log('Running Server'))
