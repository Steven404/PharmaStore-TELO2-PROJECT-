const { createPermissions, getPermissionsByUsername, getPermissions, updatePermissions, deletePermissions } = require("./permission.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createPermissions", checkToken, createPermissions);
router.post("/getPermissions", checkToken, getPermissions);
router.post("/getPermissionsByUsername", checkToken, getPermissionsByUsername);
router.patch("/updatePermissions", checkToken, updatePermissions);
router.delete("/deletePermissions", checkToken, deletePermissions);

module.exports = router;