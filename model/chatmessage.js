const MONGOOSE = require('../config/db')
const CHATMESSAGESCHEMA = MONGOOSE.Schema({
    title: {
        type: String,
        default: ""
    },
    Contant: {
        type: String,
        default: ""
    },
    Option: {
        type: Array,
        default: null
    },
},
    { timestamps: true },

)
module.exports = MONGOOSE.model('SAMPLE_CHATMESSSAGE', CHATMESSAGESCHEMA, 'SAMPLE_CHATMESSSAGE',)


