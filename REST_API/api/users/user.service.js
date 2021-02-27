const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into users(username, firstlastname, password)
                values(?,?,?)`,
            [
                data.username,
                data.firstlastname,
                data.password,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
        pool.query(
            `insert into permissions(username, permission1, permission2, permission3)
                values(?, NULL, NULL, NULL)`,
            [
                data.username,
            ],
            /*(error, results, fields) => {
                if (error) {
                    return callback(error);
                }
            }*/
        );
    },
    getUsers: callback => {
        pool.query(
            `select username, firstlastname, password from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserByUsername: (username, callback) => {
        pool.query(
            `select username, firstlastname, password from users where username = ?`,
            [
                username
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            `UPDATE users SET username = ?, firstlastname = ?, password = ? WHERE users.username = ?`,
            [
                data.newUsername,
                data.newFirstlastname,
                data.newPassword,
                data.oldUsername
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            `delete from users where username=?`,
            [
                data.username,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getUserByUsernameLogIn: (username, callback) => {
        pool.query(
            `select * from users where username = ?`,
            [
                username
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
        pool.query(
            `UPDATE clients SET numberOfOrders = (SELECT COUNT(*) FROM orders WHERE orders.pharName=clients.pharmacyName)`
        );
        pool.query(
            `UPDATE products SET piecesSold =(SELECT SUM(piecesBought) FROM orderProductsBought WHERE orderProductsBought.productN=products.productName)`
        );
    }
}
