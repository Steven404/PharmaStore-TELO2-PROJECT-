require("dotenv").config();

const { createProvider, getProviderByProviderName, getProviders, updateProvider, deleteProvider} = require("./provider.service");

const { sign } = require("jsonwebtoken");

module.exports = {
    createProvider: (req, res) => {
        const body = req.body;
        createProvider(body, (err, results) =>{
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
    getProviderByProviderName: (req, res) => {
        const providerName = req.body.providerName;
        getProviderByProviderName(providerName, (err, results) => {
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
            return res.json({
                data: results
            });
        });
    },
    getProviders: (req, res) => {
        getProviders((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tablers 'providers' is empty"
                });
            }
            return res.send(results);
        });
    },
    updateProvider: (req, res) => {
        const body = req.body;
        updateProvider(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send("Operation failed, check your variables")
                return;
            }
            if (!results){
                res.status(401).send("Operation failed, check your variables");
                return;
            }
            return res.json({
                success: true,
                message: "Proiver updated successfully!"
            });
        });
    },
    deleteProvider: (req, res) => {
        const data = req.body;
        deleteProvider(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Provider deleted successfully"
            });
        });
    }
};