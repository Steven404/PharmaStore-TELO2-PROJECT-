require("dotenv").config();

const { createOrder, insertOrderProducts, getOrderProductsBought, getOrderProductsBought2, updateOrderProducts, deleteOrderProducts, getOrderByOrderID, getOrderByClient, getOrderByOrderDate, getOrders, updateOrder, deleteOrder, deleteOrderByProductName} = require("./order.service");

const { sign } = require("jsonwebtoken");

module.exports = {
    createOrder: (req, res) => {
        const body = req.body;
        createOrder(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database connection error",
                    error: err
                });
            }
            return res.send(results);
        });
    },
    insertOrderProducts: (req, res) => {
        const body = req.body;
        insertOrderProducts(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database connection error",
                    error: err
                });
            }
            return res.send(results);
        });
    },
    deleteOrderProducts: (req, res) => {
        const body = req.body;
        deleteOrderProducts(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database connection error",
                    error: err
                });
            }
            return res.send(results);
        });
    },
    updateOrderProducts: (req, res) => {
        const body = req.body;
        updateOrderProducts(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database connection error",
                    error: err
                });
            }
            return res.send(results);
        });
    },
    getOrderByOrderID: (req, res) => {
        const orderID = req.body.orderID;
        getOrderByOrderID(orderID, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Order not found"
                });
            }
            return res.send(results);
        });
    },
    getOrderProductsBought2: (req, res) => {
        const body= req.body;
        getOrderProductsBought2(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tables 'orderhistory' is empty"
                });
            }
            return res.send(results);
        });
    },
    getOrderByOrderDate: (req, res) => {
        const orderDate= req.body.orderDate;
        getOrderByOrderDate(orderDate, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "No orders were made that day"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    getOrderByClient: (req, res) => {
        const pharName= req.body.pharName;
        getOrderByClient(pharName, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "No orders were made that day"
                });
            }
            return res.send(results);
        });
    },
    getOrders: (req, res) => {
        getOrders((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tables 'orderhistory' is empty"
                });
            }
            return res.send(results);
        });
    },
    getOrderProductsBought: (req, res) => {
        getOrderProductsBought((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tables 'orderhistory' is empty"
                });
            }
            return res.send(results);
        });
    },
    updateOrder: (req, res) => {
        const body = req.body;
        updateOrder(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send("Operation failed, check your variables")
                return;
            }
            return res.json({
                success: true,
                message: "Order updated successfully!"
            });
        });
    },
    deleteOrder: (req, res) => {
        const data = req.body;
        deleteOrder(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Order deleted successfully"
            });
        });
    },
    deleteOrderByProductName: (req, res) => {
        const data = req.body;
        deleteOrderByProductName(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Order deleted successfully"
            });
        });
    }
};