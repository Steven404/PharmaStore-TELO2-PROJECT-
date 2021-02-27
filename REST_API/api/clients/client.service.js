const pool = require("../../config/database");

module.exports = {
    createClient: (data, callback) => {
        pool.query(
            `insert into clients(pharmacyName, phoneNo, address, numberOfOrders, zipCode)
                values(?,?,?,0,?)`,
            [
                data.pharmacyName,
                data.phoneNo,
                data.address,
                data.zipCode
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getClients: callback => {
        pool.query(
            `select * from clients order by pharmacyName`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getClientByName: (pharmacyName, callback) => {
        pool.query(
            `select * from clients where pharmacyName = ?`,
            [
                pharmacyName
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateClient: (data, callback) => {
        pool.query(
            `UPDATE clients SET phoneNo = ?, address = ?, zipCode= ? WHERE clients.pharmacyName = ?`,
            [
                data.newPhoneNo,
                data.newAddress,
                data.newZipCode,
                data.oldPharmacyName,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteClient: (data, callback) => {
        pool.query(
            `DELETE FROM orderhistory where pharName = ?`,
            [
                data.pharmacyName
            ]
            
        );
        pool.query(
            `delete from clients where pharmacyName = ?`,
            [
                data.pharmacyName
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
