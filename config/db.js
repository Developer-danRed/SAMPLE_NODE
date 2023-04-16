const MONGOOSE = require('mongoose')
URL = process.env.MONGOOSE_DB;
console.log(process.env.MONGOOSE_DB,"+++++++++>>Db local");

MONGOOSE.connect(URL, (err, db) => {
    if (err) throw err
    else {
        console.log('db connect sucessfully...!')
    }
})

module.exports = MONGOOSE