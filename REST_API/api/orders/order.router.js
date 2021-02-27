const { createOrder, insertOrderProducts, getOrderProductsBought, getOrderProductsBought2, updateOrderProducts, deleteOrderProducts, getOrderByOrderID, getOrderByClient, getOrderByOrderDate, getOrders, updateOrder, deleteOrder, deleteOrderByProductName } = require("./order.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createOrder", checkToken, createOrder);
router.post("/insertOrderProducts", checkToken, insertOrderProducts);
router.post("/getOrders", checkToken, getOrders);
router.post("/getOrderByOrderDate", checkToken, getOrderByOrderDate);
router.post("/getOrderByClient", checkToken, getOrderByClient);
router.post("/getOrderByOrderID", checkToken, getOrderByOrderID);
router.post("/getOrderProductsBought", checkToken, getOrderProductsBought);
router.post("/getOrderProductsBought2", checkToken, getOrderProductsBought2);
router.patch("/updateOrder", checkToken, updateOrder);
router.patch("/updateOrderProducts", checkToken, updateOrderProducts);
router.delete("/deleteOrder", checkToken, deleteOrder);
router.delete("/deleteOrderProducts", checkToken, deleteOrderProducts);
router.delete("/deleteOrderByProductName", checkToken, deleteOrderByProductName);

module.exports = router;