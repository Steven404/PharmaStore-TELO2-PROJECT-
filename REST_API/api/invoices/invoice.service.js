const pool = require("../../config/database");

module.exports = {
    createInvoice: (data, callback) => {
        pool.query(
            `insert into invoices(invoiceID, orderID, pharName, regDate, finalPrice, Tax)
            values(?,?,(SELECT pharName FROM orders WHERE orderID=?),(SELECT orderDate FROM orders WHERE orderID=?),(SELECT orderCost FROM orders where orderID=?), (SELECT (orderCost)*0.24 FROM orders where orderID=?))`,
            [
                data.orderID,
                data.orderID,
                data.orderID,
                data.orderID,
                data.orderID,
                data.orderID
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getInvoices: callback => {
        pool.query(
            `select * from invoices`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getInvoicesByClientName: (data, callback) => {
        pool.query(
            `select * from invoices WHERE pharName= ?`,
            [
                data.pharName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getInvoiceByInvoiceID: (invoiceID, callback) => {
        pool.query(
            `select * from invoices where invoiceID = ?`,
            [
                invoiceID
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getInvoiceByOrderID: (orderID, callback) => {
        pool.query(
            `select * from invoices where orderID = ?`,
            [
                orderID
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateInvoice: (data, callback) => {
        pool.query(
            `UPDATE invoices SET orderID = ?, pharName = ?, regDate = ?, finalPrice = ? WHERE invoices.invoiceID = ?`,
            [
                data.newOrderID,
                data.newPharName,
                data.newRegDate,
                data.neFinalPrice,
                data.invoiceID
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteInvoice: (data, callback) => {
        pool.query(
            `delete from invoices where invoiceID = ?`,
            [
                data.invoiceID,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
}
