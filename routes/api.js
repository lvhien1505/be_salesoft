const express = require("express");
const authRouter = require("./auth");
const productRouter = require("./product");
const customerRouter = require("./customer");
const supplierRouter = require("./supplier");
const categoryRouter = require("./category");
const brandRouter = require("./brand");


const app = express();

app.use("/auth/", authRouter);
app.use("/product/", productRouter);
app.use("/customer/", customerRouter);
app.use("/supplier/", supplierRouter);
app.use("/category/", categoryRouter);
app.use("/brand/", brandRouter);

module.exports = app;