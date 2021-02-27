const { createProvider, getProviderByProviderName, getProviders, updateProvider, deleteProvider } = require("./provider.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createProvider", checkToken, createProvider);
router.post("/getProviders", checkToken, getProviders);
router.post("/getProvider", checkToken, getProviderByProviderName);
router.patch("/updateProvider", checkToken, updateProvider);
router.delete("/deleteProvider", checkToken, deleteProvider);

module.exports = router;