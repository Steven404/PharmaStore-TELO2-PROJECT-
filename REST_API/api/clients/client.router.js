const { createClient, getClientByName, getClients, updateClient, deleteClient } = require("./client.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createClient", checkToken, createClient);
router.post("/getClients", checkToken, getClients);
router.post("/getClientByName", checkToken, getClientByName);
router.patch("/updateClient", checkToken, updateClient);
router.delete("/deleteClient", checkToken, deleteClient);

module.exports = router;