require("dotenv").config();

const { create, getUserByUsername,getUsers,updateUser, deleteUser, getUserByUsernameLogIn } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) =>{
            if (err) {
                console.log(err);
                return res.status(500).send("Database error, check for duplicate entries");
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    getUserByUsername: (req, res) => {
        const username = req.body.username;
        getUserByUsername(username, (err, results) => {
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
            return res.json({
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: false,
                    message: "Tablers 'users' is empty"
                });
            }
            return res.send(results);
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.newPassword = hashSync(body.newPassword, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                res.status(401).send("Operation failed, check your variables");
                return;
            }
            return res.json({
                success: true,
                message: "User updated successfully!"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "User deleted successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUsernameLogIn(body.username, (err, results) => {
            if (err){
                console.log(err);
            }
            if (!results){
                res.status(404).send("Invalid username/password combination")
                return;
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({data: body.username}, process.env.ENCRYPTION_TOKEN_KEY, {
                    expiresIn: "8h"
                });
                return res.json({
                    token: jsontoken
                });
            } else {
                return res.status(400).send("Invalid username/password combination");
            }
        });
    },
};