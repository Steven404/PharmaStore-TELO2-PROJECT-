const pool = require("../../config/database");

module.exports = {
    createProvider: (data, callback) => {
        pool.query(
            `insert into providers(providerName)
                values(?)`,
            [
                data.providerName,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getProviders: callback => {
        pool.query(
            `select * from providers order by providerName`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getProviderByProviderName: (providerName, callback) => {
        pool.query(
            `select * from providers where providerName = ?`,
            [
                providerName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateProvider: (data, callback) => {
        pool.query(
            `UPDATE providers SET providerName = ? WHERE providers.providerName = ?`,
            [
                data.newProviderName,
                data.oldProviderName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    deleteProvider: (data, callback) => {
        pool.query(
            `delete from products where provider=?`,
            [
                data.providerName
            ]
        );
        pool.query(
            `delete from providers where providerName=?`,
            [
                data.providerName,
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
