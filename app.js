const EXPRESS = require('express');
const APP = EXPRESS()
const CORS = require('cors')
const logger = require('morgan');
require('dotenv').config()
const BODY_PARSER = require('body-parser')
const USER_ROUTER = require('./router/users')

APP.use(BODY_PARSER.json())
APP.use(CORS());
APP.use(EXPRESS.urlencoded({ extended: true }))
APP.use(logger('dev'));

APP.use('/users', USER_ROUTER)

APP.use('/', function (req, res) {
  res.json({
    status: 1,
    code: 200,
    message: "Node.js Server Running..!"
  })
});

APP.use('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization ,Accept');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

APP.listen(process.env.PORT, () => {
  console.log(`<========== Express Backend server Run stared ${process.env.PORT} ==========>`);
})

module.exports = APP;