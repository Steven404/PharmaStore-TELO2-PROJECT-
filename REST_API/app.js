//REST API
require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const providerRouter = require("./api/providers/provider.router");
const permissionRouter = require("./api/permissions/permission.router");
const productRouter = require("./api/products/product.router");
const orderRouter = require("./api/orders/order.router");
const clientRouter = require("./api/clients/client.router");
const invoiceRouter = require("./api/invoices/invoice.router");



const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false}))
app.use(express.json());

app.use("/api/users", userRouter);

app.use("/api/providers", providerRouter);

app.use("/api/permissions", permissionRouter);

app.use("/api/clients", clientRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.use("/api/invoices", invoiceRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on PORT : ", process.env.APP_PORT);
});

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});