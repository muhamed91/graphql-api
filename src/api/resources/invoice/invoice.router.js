const express = require('express');
const passport = require('passport');
const { findAllInvoices, createInvoice, findOneInvoice, deleteInvoice, updateInvoice } = require('./invoice.controller');

const invoiceRouter = express.Router();

invoiceRouter.route('/')
.post(passport.authenticate('jwt', {session: false}),createInvoice)
.get(passport.authenticate('jwt', {session: false}),findAllInvoices);

invoiceRouter.route('/:id')
.put(passport.authenticate('jwt', {session: false}),updateInvoice)
.delete(passport.authenticate('jwt', {session: false}),deleteInvoice)
.get(passport.authenticate('jwt', {session: false}),findOneInvoice)


module.exports = invoiceRouter







