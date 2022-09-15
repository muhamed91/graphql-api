const express = require('express');
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const restRouter = require('./api');
const configureStrategy = require('./middleware/passport.middleware');
const {graphqlHTTP} = require('express-graphql');
const { graphiqlSchema } = require('./api/schema');




const app = express();
const port = process.env.PORT;

connectDB();

app.use('/graphql', graphqlHTTP({
  schema: graphiqlSchema,
  pretty: true,
  graphiql: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
configureStrategy();

app.use('/api', restRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});