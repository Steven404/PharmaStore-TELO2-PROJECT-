const pool = require("../../config/database");

module.exports = {
    createPermissions: (data, callback) => {
        pool.query(
            `insert into permissions(username, permission1, permission2, permission3)
                values(?,?,?,?)`,
            [
                data.username,
                data.permission1,
                data.permission2,
                data.permission3
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPermissions: callback => {
        pool.query(
            `select * from permissions`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPermissionsByUsername: (username, callback) => {
        pool.query(
            `select * from permissions where username = ?`,
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
    updatePermissions: (data, callback) => {
        pool.query(
            `UPDATE permissions SET permission1 = ?, permission2 = ?, permission3 = ? WHERE permissions.username = ?`,
            [
                data.permission1,
                data.permission2,
                data.permission3,
                data.username
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deletePermissions: (data, callback) => {
        pool.query(
            `delete from permissions where username=?`,
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
    }
}
