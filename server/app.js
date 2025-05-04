const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  "mongodb+srv://rumeeshathathsaranigunarathna:1WbcyR92XzeERXjm@readinglist.xepk00q.mongodb.net/?retryWrites=true&w=majority&appName=ReadingList"
);
mongoose.connection.once('open', () => {
      console.log('connected to database!');
})

app.use('/graphql', graphqlHTTP({
      schema,
      graphiql:true
}));

app.listen(4000, () => {
      console.log('now listning for request on port 4000');
});