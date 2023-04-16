var express = require('express');
var router = express.Router();
var USERS = require('../controller/users')
var { Jwt_verify_token } = require('../helper/jwt')


router.post('/register', USERS.user_regsiter)
router.post('/login', USERS.user_login)
router.post('/user_update', Jwt_verify_token, USERS.user_update)
router.post('/walletcreated', USERS.user_wallet_created)
// router.post('/withdraw', USERS.withdraw_users)
// router.post('/match_calender', USERS.basic_cron_Function)
// router.post('/chatdata_Admin', USERS.chatsBot_admin)
// router.post('/chatsend_User', USERS.chatsBot_Message)

// router.post('/basic', basicjs.basicJavascriptData)



module.exports = router;
