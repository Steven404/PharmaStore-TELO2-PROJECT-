const { createInvoice, getInvoiceByInvoiceID, getInvoiceByOrderID, getInvoicesByClientName, getInvoices, updateInvoice, deleteInvoice } = require("./invoice.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/createInvoice", checkToken, createInvoice);
router.post("/getInvoices", checkToken, getInvoices);
router.post("/getInvoiceByInvoiceID", checkToken, getInvoiceByInvoiceID);
router.post("/getInvoicesByClientName", checkToken, getInvoicesByClientName);
router.post("/getInvoiceByOrderID", checkToken, getInvoiceByOrderID);
router.patch("/updateInvoice", checkToken, updateInvoice);
router.delete("/deleteInvoice", checkToken, deleteInvoice);

module.exports = router;