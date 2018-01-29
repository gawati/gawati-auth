const path = require('path');
const router = require('express').Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get(['/login', '/register', '/reset-password'], (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

router.post('/register',
  // (req, res, next) => {
  //   console.log('POST to /register with', req.body); 
  //   next();
  // },
  userController.validateRegister,
  userController.register,
  authController.login
);

router.post('/login',
  // (req, res, next) => {
  //   console.log('POST to /login with', req.body); 
  //   next();
  // },
  userController.validateLogin,
  authController.login
);

module.exports = router;