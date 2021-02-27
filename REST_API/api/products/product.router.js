const { createProduct, getProductByProductName, getProducts, updateProduct, deleteProduct } = require("./product.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createProduct", checkToken, createProduct);
router.post("/getProducts", checkToken, getProducts);
router.post("/getProductByProductName", checkToken, getProductByProductName);
router.patch("/updateProduct", checkToken, updateProduct);
router.delete("/deleteProduct", checkToken, deleteProduct);

module.exports = router;