const express = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');
const customerRouter = require('./customer');
const supplierRouter = require('./supplier');
const categoryRouter = require('./category');
const brandRouter = require('./brand');
const invoiceRouter = require('./invoice');
const tablePriceRouter = require('./tablePrice');

const app = express();

app.use('/auth/', authRouter);
app.use('/product/', productRouter);
app.use('/customer/', customerRouter);
app.use('/supplier/', supplierRouter);
app.use('/category/', categoryRouter);
app.use('/brand/', brandRouter);
app.use('/invoice/', invoiceRouter);
app.use('/table-price/', tablePriceRouter);

module.exports = app;
