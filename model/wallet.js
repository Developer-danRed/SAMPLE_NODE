const MONGOOSE = require('../config/db')
const USERSCHEMA = MONGOOSE.Schema({
    userid: {
        type: String,
        default: ""
    },
    wallet: [{
        currency: { type: String, default: "" },
        amount: { type: Number, default: 0 },
        addamount: { type: Number, default: 0 },
        winingamount: { type: Number, default: 0 },
        holder: { type: Number, default: 0 }
    }],
},
    { timestamps: true },

)
module.exports = MONGOOSE.model('SAMPLE_USERWALLET', USERSCHEMA,'SAMPLE_USERWALLET')


