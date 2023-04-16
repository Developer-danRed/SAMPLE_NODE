const MONGOOSE = require('../config/db')
const USERSCHEMA = MONGOOSE.Schema({
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    confirmPassword: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
        default: ""
    },
    address: {
        pincode: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
        city: { type: String, default: "" }
    },
    chats: {
        type: Array
    }
},
    { timestamps: true },

)
module.exports = MONGOOSE.model('SAMPLE_USERS', USERSCHEMA, 'SAMPLE_USERS',)


