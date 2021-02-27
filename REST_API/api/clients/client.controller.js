require("dotenv").config();

const { createClient, getClientByName, getClients, updateClient, deleteClient } = require("./client.service");

const { sign } = require("jsonwebtoken");

module.exports = {
    createClient: (req, res) => {
        const body = req.body;
        createClient(body, (err, results) =>{
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
    getClientByName: (req, res) => {
        const pharmacyName = req.body.pharmacyName;
        getClientByName(pharmacyName, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Client not found"
                });
            }
            return res.send(results);
        });
    },
    getClients: (req, res) => {
        getClients((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Table 'clients' is empty"
                });
            }
            return res.send(results);
        });
    },
    updateClient: (req, res) => {
        const body = req.body;
        updateClient(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send("Operation failed, check your variables")
                return;
            }
            return res.json({
                success: true,
                message: "Client updated successfully!"
            });
        });
    },
    deleteClient: (req, res) => {
        const data = req.body;
        deleteClient(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Client deleted successfully"
            });
        });
    }
};