const pool = require("../../config/database");

module.exports = {
    createProduct: (data, callback) => {
        pool.query(
            `insert into products(productName, piecesSold, provider, costPricePerPiece, sellPricePerPiece)
                values(?,0,?,?,?)`,
            [
                data.productName,
                data.provider,
                data.costPricePerPiece,
                data.sellPricePerPiece
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getProducts: callback => {
        pool.query(
            `select * from products ORDER BY productName`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getProductByProductName: (productName, callback) => {
        pool.query(
            `select * from products where productName = ?`,
            [
                productName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateProduct: (data, callback) => {
        pool.query(
            `UPDATE products SET piecesSold = ?, provider = ?, costPricePerPiece = ?, sellPricePerPiece = ? WHERE products.productName = ?`,
            [
                data.newPiecesSold,
                data.newProvider,
                data.newCostPricePerPiece,
                data.newSellPricePerPiece,
                data.oldProductName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteProduct: (data, callback) => {
        pool.query(
            `delete from products where productName=?`,
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
        pool.query(
            `delete from orderProductsBought where productN=?`,
            [
                data.productName,
            ]
        );
    }
}
