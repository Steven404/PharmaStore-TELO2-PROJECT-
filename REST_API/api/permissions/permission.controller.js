require("dotenv").config();

const { createPermissions, getPermissionsByUsername, getPermissions, updatePermissions, deletePermissions} = require("./permission.service");

const { sign } = require("jsonwebtoken");

module.exports = {
    createPermissions: (req, res) => {
        const body = req.body;
        createPermissions(body, (err, results) =>{
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
    getPermissionsByUsername: (req, res) => {
        const username = req.body.username;
        getPermissionsByUsername(username, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "User not found"
                });
            }
            return res.send(results);
        });
    },
    getPermissions: (req, res) => {
        getPermissions((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tablers 'permissions' is empty"
                });
            }
            return res.send(results);
        });
    },
    updatePermissions: (req, res) => {
        const body = req.body;
        updatePermissions(body, (err, results) => {
            if (err) {
                console.log(err);
                res.status(404).send("Operation failed, check your variables")
                return;
            }
            return res.json({
                success: true,
                message: "Permissions update successfully!"
            });
        });
    },
    deletePermissions: (req, res) => {
        const data = req.body;
        deletePermissions(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Permissions deleted successfully"
            });
        });
    }
};