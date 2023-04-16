const jwt = require('jsonwebtoken')
const path = require('path')
const buffer = require('crypto')
var key = buffer.toString('hex');

const secret = process.env.JWT_SECRET;
const options = { expiresIn: '1h' };

module.exports.signJwt = function (payload) {
    let data = { _id: payload }
    try {
        return new Promise((resolve, reject) => {
            jwt.sign(data, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    } catch (error) {
        console.log("signJwt  =========>", error);
    }
}


// module.exports.Jwt_verify_token = function (req, res, next) {
//     console.log("hii");
//     try {
//         var token = req.headers.authorization
//         if (!token) {
//             return res.status(401).send('Access denied. No token provided.');
//         }
//         console.log("token: ", token);
//         return new Promise((resolve, reject) => {
//             jwt.verify(token, secret, (err, decoded) => {
//                 console.log("decoded: ", decoded);
//                 if (err) {
//                     reject(err);
//                 } else {
//                     // resolve(decoded._id);
//                     next(decoded._id)
//                     console.log("decoded._id: ", decoded._id);
//                 }
//             });
//         });
//     } catch (error) {
//         console.log("Jwt_verify_token =========>", error);
//     }
// }


module.exports.Jwt_verify_token = function (req, res, next) {
    try {
        var token = req.headers.authorization
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        console.log("token: ", token);
        const decoded = jwt.verify(token, secret);
        console.log("decoded: ", decoded);
        if (decoded)
            req._id = decoded._id;
        next();
    } catch (error) {
        console.log("Jwt_verify_token =========>", error);
    }
}

