const pool = require("../../config/database");

module.exports = {
    createOrder: (data, callback) => {
        pool.query(
            `insert into orders(orderID,pharName,pharAddress,distributor,orderCost,cleanEarnings,orderDate)
            VALUES(?,?,(SELECT address FROM clients WHERE pharmacyName=?),?,null,null,?)`,
            [
                data.orderID,
                data.pharName,
                data.pharName,
                data.distributor,
                data.orderDate,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
        pool.query(
            `UPDATE clients SET numberOfOrders=(SELECT COUNT(*) FROM orders WHERE pharmacyName=pharName)`
        );
        setTimeout(function(){
            pool.query(
                `UPDATE orders SET orderZipCode = (SELECT zipCode FROM clients WHERE clients.pharmacyName=?) WHERE pharName=?`,
                [
                    data.pharName,
                    data.pharName
                ]  
              );
        }, 1250);
        
    },
    insertOrderProducts: (data, callback) => {
        pool.query(
            `insert into orderProductsBought(orderID,productN,piecesBought,oCost,oEarnings)
            VALUES(?,?,?,(SELECT (sellPricePerPiece)*? FROM products WHERE productName=?),
            ((SELECT (sellPricePerPiece)*? FROM products WHERE productName=?) - (SELECT (costPricePerPiece)*? FROM products WHERE productName=?)));`,
            [
                data.orderID,
                data.productName,
                data.piecesBought,
                data.piecesBought,
                data.productName,
                data.piecesBought,
                data.productName,
                data.piecesBought,
                data.productName,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
        pool.query(
            `UPDATE clients SET numberOfOrders = (SELECT COUNT(*) FROM orders WHERE orders.pharName=clients.pharmacyName)`
        );
        pool.query(
            `UPDATE products SET piecesSold =(SELECT SUM(piecesBought) FROM orderProductsBought WHERE orderProductsBought.productN=products.productName)`
        );
        pool.query(
            `UPDATE orders SET orderCost=(SELECT SUM(oCost) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
        pool.query(
            `UPDATE orders SET cleanEarnings=(SELECT SUM(oEarnings) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
    },
    getOrderProductsBought: callback => {
        pool.query(
            `select * from orderProductsBought`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getOrderProductsBought2: (data, callback)=> {
        pool.query(
            `select * from orderProductsBought WHERE orderID=?`,
            [
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
    updateOrderProducts: (data, callback) => {
        pool.query(
            `UPDATE orderProductsBought SET piecesBought=? WHERE orderID=? AND productN=?`,
            [
                data.newPiecesBought,
                data.orderID,
                data.productName,
                
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
        pool.query(
            `UPDATE orderProductsBought SET oCost=(SELECT (sellPricePerPiece)*? FROM products WHERE productName=?) WHERE orderID=? AND productN=?`,
            [
                data.newPiecesBought,
                data.productName,
                data.orderID,
                data.productName
            ]
        );
        pool.query(
            `UPDATE orderProductsBought SET oEarnings=((SELECT (sellPricePerPiece)*? FROM products WHERE productName=?) - (SELECT (costPricePerPiece)*? FROM products WHERE productName=?)) where orderID=? AND productN=?`,
            [
                data.newPiecesBought,
                data.productName,
                data.newPiecesBought,
                data.productName,
                data.orderID,
                data.productName,
            ]
        );
        pool.query(
            `UPDATE orders SET orderCost=(SELECT SUM(oCost) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
        pool.query(
            `UPDATE orders SET cleanEarnings=(SELECT SUM(oEarnings) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
    },
    deleteOrderProducts: (data, callback) => {
        pool.query(
            `delete from orderProductsBought WHERE orderID=? AND productN=?`,
            [
                data.orderID,
                data.productName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
        pool.query(
            `UPDATE orders SET orderCost=(SELECT SUM(oCost) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
        pool.query(
            `UPDATE orders SET cleanEarnings=(SELECT SUM(oEarnings) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
    },
    getOrders: callback => {
        pool.query(
            `select * from orders`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getOrderByOrderID: (orderID, callback) => {
        pool.query(
            `select * from orders where orderID = ?`,
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
    getOrderByClient: (pharName, callback) => {
        pool.query(
            `select * from orders where pharName = ?`,
            [
                pharName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getOrderByOrderDate: (orderDate, callback) => {
        pool.query(
            `select * from orders where orderDate = ?`,
            [
                orderDate
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateOrder: (data, callback) => {
        pool.query(
            `UPDATE orders SET pharName = ?, pharAddress = (SELECT address FROM clients WHERE pharmacyName=?), distributor = ?,
            orderDate = ? WHERE orders.orderID = ?`,
            [
                data.newPharName,
                data.newPharName,
                data.newDistributor,
                data.newOrderDate,
                data.orderID
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
		setTimeout(function(){
            pool.query(
                `UPDATE orders SET orderZipCode = (SELECT zipCode FROM clients WHERE clients.pharmacyName=?) WHERE pharName=?`,
                [
                    data.pharName,
                    data.pharName
                ]  
              );
        }, 1250);

    },
    deleteOrder: (data, callback) => {
        pool.query(
          `delete from invoices where orderID=?`,
          [
              data.orderID
          ]  
        );
        pool.query(
            `delete from orderProductsBought where orderID=?`,
            [
              data.orderID,
          ]
          );
        pool.query(
            `delete from orders where orderID=?`,
            [
                data.orderID,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    deleteOrderProductBought: (data, callback) => {
        pool.query(
            `delete from orderProductsBought where orderID=? AND productN=?`,
            [
                data.orderID,
                data.productName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
        pool.query(
            `UPDATE orders SET orderCost=(SELECT SUM(oCost) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
        pool.query(
            `UPDATE orders SET cleanEarnings=(SELECT SUM(oEarnings) FROM orderProductsBought WHERE orderID=?) WHERE orderID=?`,
             [
                 data.orderID,
                 data.orderID,
             ]
        );
    },
    deleteOrderByProductName: (data, callback) => {
        pool.query(
            `delete from orders where productName=?`,
            [
                data.productName,
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
