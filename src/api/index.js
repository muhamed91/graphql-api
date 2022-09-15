const express = require('express');
const clientRouter = require('./resources/client/client.router');
const invoiceRouter = require('./resources/invoice/invoice.router');
const userRouter = require('./resources/user/user.router');

const restRouter = express.Router();


restRouter.use('/invoices', invoiceRouter);
restRouter.use('/clients', clientRouter);
restRouter.use('/user', userRouter)

module.exports = restRouter;