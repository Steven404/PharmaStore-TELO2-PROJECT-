const { createUser, getUserByUsername, getUsers, updateUser, deleteUser, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createUser", createUser);
router.post("/getUsers", checkToken, getUsers);
router.post("/getUser", checkToken, getUserByUsername);
router.patch("/update", checkToken, updateUser);
router.delete("/deleteUser", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;