const USERS = require('../model/users_schema')
const USERS_WALLET = require('../model/wallet')
const CHATMESSAGE = require('../model/chatmessage')
var cron = require('node-cron');

// const { Key_data } = require('../key/key_jwt')
// var keyFile = require('../key/key_jwt')

// cron.schedule('* */10 * * *', (data) => {
//     if (data) {
//         Chat_data_clear()
//         console.log('user chatbot data clear...!');
//     } else {
//         console.log('user chatbot data clear falied...!');
//     }
// });


exports.user_regsiter = async (req, res) => {
    let data = req.body
    USERS.findOne({ email: data.email }, function (err, userDetails) {
        if (userDetails) {
            res.json({
                status: 'fail',
                responses: 400,
                message: "Already Register UserData"
            })
        } else {
            USERS.create({
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            }, async (err, userInsetData) => {
                if (err) {
                    res.json({
                        status: 'fail',
                        responescode: 500,
                        message: "error ocuured!"
                    })
                } else {
                    let token_data = await jwt_load.signJwt(userInsetData._id)
                    res.json({
                        status: 'success',
                        responescode: 200,
                        message: "User Regsiter Successfully!",
                        data: userInsetData,
                        token: token_data
                    })
                }

            })
        }
    })
}

exports.user_login = (req, res) => {
    let data = req.body
    USERS.findOne({
        email: data.email,
    },async function (err, userData) {
        if (!userData) {
            res.json({
                status: 'fail',
                responescode: 400,
                message: "Invaild Email"
            })
        } else {
            if (data.password != userData.password) {
                res.json({
                    status: 'fail',
                    responescode: 400,
                    message: "Invaild Password"
                })
            } else {
                let token_data = await jwt_load.signJwt(userData._id)
                res.json({
                    status: 'success',
                    responescode: 200,
                    message: "User Login Success",
                    data: userData,
                    token: token_data
                })
            }
        }
    })
}

exports.user_update = async(req, res) => {
    const userId = req._id
    console.log("userId: =====>", userId);
    const { email, username, pincode, state, country, city } = req.body
    USERS.findOne({
        email: email
    }, function (err, data) {
        if (!data) {
            res.json({
                status: false,
                code: 500,
                message: "error occured"
            })
        } else {
            var address = {
                pincode: pincode,
                state: state,
                country: country,
                city: city
            }
            USERS.findOneAndUpdate({ _id: userId }, {
                $set: {
                    userName: username,
                    address: address
                }
            }, function (err, updatedata) {
                console.log("updatedata:====>>", updatedata);
                if (!updatedata) {
                    res.json({
                        status: false,
                        code: 500,
                        message: "user profile update failed..!"
                    })
                } else {
                    res.json({
                        status: true,
                        code: 200,
                        message: "user profile update successfully"
                    })
                }
            })
        }
    })
}

exports.user_wallet_created = (req, res) => {
    const { currency, email } = req.body
    USERS.findOne({ email: email }, function (err, data) {
        if (err) {
            res.json({
                status: false,
                code: 500,
                message: "error occured"
            })
        } else {

            USERS_WALLET.create({ userid: data._id }, function (err, data) {
                if (!data) {
                    res.json({
                        status: false,
                        code: 500,
                        message: "error occured"
                    })
                } else {
                    var wallet = [{
                        currency: currency,
                        amount: 0,
                        addamount: 0,
                        winingamount: 0,
                        holder: 0
                    }]
                    USERS_WALLET.updateOne({ userid: data.userid }, { $set: { wallet: wallet } }, function (err, data) {
                        console.log("data:=====>> ", data);
                        res.json({
                            status: true,
                            code: 200,
                            message: "user wallet created success!"
                        })
                    })

                }
            })

        }
    })
}
// exports.withdraw_users = (req, res) => {
//     const { amount, email } = req.body
//     USERS.findOne({ email: email }, function (err, data) {
//         if (err) {
//             res.json({
//                 status: false,
//                 code: 500,
//                 message: "error occured"
//             })
//         } else {
//             USERS_WALLET.findOne({ userid: data._id }, function (err, data) {
//                 if (!data) {
//                     res.json({
//                         status: false,
//                         code: 500,
//                         message: "error occured"
//                     })
//                 } else if (data.wallet[0].winingamount <= amount) {
//                     res.json({
//                         status: true,
//                         code: 200,
//                         message: "balances not wallet..deposit amount!!"
//                     })
//                 } else {
//                     var avail_amount = data.wallet[0].winingamount - amount
//                     console.log("avail_amount:====>>> ", avail_amount);
//                     var currency = data.wallet[0].currency
//                     console.log("currency: ", currency);

//                     var wallet = [{
//                         currency: currency,
//                         amount: 0,
//                         addamount: 0,
//                         winingamount: avail_amount,
//                         holder: 0
//                     }]
//                     USERS_WALLET.updateOne({ userid: data.userid }, { $set: { wallet: wallet } }, function (err, data) {
//                         console.log("data:=====>> ", data);
//                         res.json({
//                             status: true,
//                             code: 200,
//                             // message: "user withdraw succexports.basic_cron_Function = function (req, res) {
//                                 //     var api_url
//                                 //     api_url = "file:///home/devel-selvamprem/Documents/PROJECT/sample/json/match.json"
                                
//                                 //     const request = require('request');
//                                 //     request(api_url, function (error, response) {
//                                 //         console.log("error:======>>", error);
//                                 //         console.log("response======>> ", response);
//                                 //         res.json({ response })
//                                 //     });
                                
//                                 // }
//                                 // exports.chatsBot_admin = function (req, res) {
//                                 //     let data = req.body
//                                 //     CHATMESSAGE.create({
//                                 //         title: data.title,
//                                 //         Contant: data.contant,
//                                 //         Option: data.option
//                                 //     }, function (err, botdata) {
//                                 //         console.log("botdata:======>>", botdata);
//                                 //         if (!botdata) {
//                                 //             res.json({
//                                 //                 sattus: 0,
//                                 //                 message: "Not found!"
//                                 //             })
//                                 //         } else {
//                                 //             res.json({
//                                 //                 sattus: 1,
//                                 //                 message: "Chat botmessage success..!",
//                                 //                 data: botdata
//                                 //             })
//                                 //         }
//                                 //     })
//                                 // }essfully!"
//                         })
//                     })

//                 }
//             })

//         }
//     })
// }
// exports.basic_cron_Function = function (req, res) {
//     var api_url
//     api_url = "file:///home/devel-selvamprem/Documents/PROJECT/sample/json/match.json"

//     const request = require('request');
//     request(api_url, function (error, response) {
//         console.log("error:======>>", error);
//         console.log("response======>> ", response);
//         res.json({ response })
//     });

// }
// exports.chatsBot_admin = function (req, res) {
//     let data = req.body
//     CHATMESSAGE.create({
//         title: data.title,
//         Contant: data.contant,
//         Option: data.option
//     }, function (err, botdata) {
//         console.log("botdata:======>>", botdata);
//         if (!botdata) {
//             res.json({
//                 sattus: 0,
//                 message: "Not found!"
//             })
//         } else {
//             res.json({
//                 sattus: 1,
//                 message: "Chat botmessage success..!",
//                 data: botdata
//             })
//         }
//     })
// }
// exports.chatsBot_Message = function (req, res) {
//     let data = req.body //message
//     CHATMESSAGE.findOne({}, function (err, bot_data) {
//         console.log("bot_data:====>>> ", bot_data);
//         if (data.title == "") {
//             res.json({ status: 1, data: bot_data })
//         } else {
//             CHATMESSAGE.findOne({
//                 title: data.title
//             }, function (err, botadminsend) {
//                 console.log("botadminsend:=====>>", botadminsend);
//                 if (!botadminsend) {
//                     res.json({
//                         sattus: 0,
//                         message: "Not found!"
//                     })
//                 } else {
//                     var id = "637f9cdeece318bf6e5b3ad1"
//                     USERS.findOne({ _id: id }, function (err, userdata) {
//                         console.log("userdata:=====>>", userdata);
//                         data.contant = botadminsend.Contant
//                         data.Name = userdata.userName
//                         data.userid = userdata._id
//                         data.Date = new Date()
//                         console.log("data====>>", data);
//                         USERS.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $push: { "chats": data } }, function (err, chatdata) {
//                             console.log("chatdata:=====>>", chatdata);
//                             if (chatdata) {
//                                 res.json({
//                                     sattus: 1,
//                                     message: "Chat message send successfully..!",
//                                     data: botadminsend
//                                 })
//                             }
//                         })
//                     })
//                 }
//             })
//         }
//     })
// }
// function Chat_data_clear() {
//     var id = "637f9cdeece318bf6e5b3ad1"
//     USERS.updateOne({ _id: id }, { "chats": [] }, function (err, userdataclear) {
//         if (userdataclear) {
//             console.log("chatdata_clear:=====>> ", userdataclear);
//         } else {
//             console.log("err:=====>>", err);
//         }
//     })
// }