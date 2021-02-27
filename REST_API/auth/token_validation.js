const { verify } = require ("jsonwebtoken");
require("dotenv").config();

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, process.env.ENCRYPTION_TOKEN_KEY, (err, decoded) => {
                if(err) {
                    res.status(401).send("Access denied: Invalid token");
                } else {
                    next();
                }
            });
        } else{
            res.status(401).send("invalid authorization");
        }
    }
}