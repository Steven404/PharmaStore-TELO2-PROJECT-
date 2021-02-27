require("dotenv").config();

const { createProduct, getProductByProductName, getProducts, updateProduct, deleteProduct} = require("./product.service");

const { sign } = require("jsonwebtoken");

module.exports = {
    createProduct: (req, res) => {
        const body = req.body;
        createProduct(body, (err, results) =>{
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
    getProductByProductName: (req, res) => {
        const productName = req.body.productName;
        getProductByProductName(productName, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Provider not found"
                });
            }
            return res.send(results);
        });
    },
    getProducts: (req, res) => {
        getProducts((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tablers 'products' is empty"
                });
            }
            return res.send(results);
        });
    },
    updateProduct: (req, res) => {
        const body = req.body;
        updateProduct(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send("Operation failed, check your variables")
                return;
            }
            return res.json({
                success: true,
                message: "Product updated successfully!"
            });
        });
    },
    deleteProduct: (req, res) => {
        const data = req.body;
        deleteProduct(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Product deleted successfully"
            });
        });
    }
};