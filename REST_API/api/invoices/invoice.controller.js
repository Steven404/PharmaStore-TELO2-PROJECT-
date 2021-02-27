require("dotenv").config();

const { createInvoice, getInvoiceByInvoiceID, getInvoiceByOrderID, getInvoices, getInvoicesByClientName, updateInvoice, deleteInvoice } = require("./invoice.service");

const { sign } = require("jsonwebtoken");

module.exports = {
    createInvoice: (req, res) => {
        const body = req.body;
        createInvoice(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    getInvoiceByInvoiceID: (req, res) => {
        const invoiceID = req.body.invoiceID;
        getInvoiceByInvoiceID(invoiceID, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Invoice not found"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    getInvoiceByOrderID: (req, res) => {
        const orderID = req.body.orderID;
        getInvoiceByOrderID(orderID, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Invoice not found"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    getInvoices: (req, res) => {
        getInvoices((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Table 'invoices' is empty"
                });
            }
            return res.send(results);
        });
    },
    getInvoicesByClientName: (req, res) => {
        const body= req.body;
        getInvoicesByClientName(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Table 'invoices' is empty"
                });
            }
            return res.send(results);
        });
    },
    updateInvoice: (req, res) => {
        const body = req.body;
        updateInvoice(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send("Operation failed, check your variables")
                return;
            }
            return res.json({
                success: true,
                message: "Invoice updated successfully!"
            });
        });
    },
    deleteInvoice: (req, res) => {
        const data = req.body;
        deleteInvoice(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Invoice deleted successfully"
            });
        });
    }
};