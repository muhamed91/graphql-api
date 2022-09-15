const express =  require('express');
const { signuUp, login, testroute } = require('./user.controller');
const passport = require('passport');

const userRouter = express.Router();

userRouter.post('/signup', signuUp)
userRouter.post('/login', login)
userRouter.post('/test', passport.authenticate('jwt', {session: false}), testroute)





module.exports = userRouter;