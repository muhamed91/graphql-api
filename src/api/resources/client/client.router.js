const express = require('express');
const passport = require('passport');
const { createClient, findAllClients, findOneClient, deleteClient, updateClient } = require('./client.controller');

const clientRouter = express.Router();

clientRouter.route('/')
.post(passport.authenticate('jwt', {session: false}),createClient)
.get(passport.authenticate('jwt', {session: false}),findAllClients)


clientRouter.route('/:id')
.get(passport.authenticate('jwt', {session: false}),findOneClient)
.delete(passport.authenticate('jwt', {session: false}),deleteClient)
.put(passport.authenticate('jwt', {session: false}),updateClient)




module.exports = clientRouter;

