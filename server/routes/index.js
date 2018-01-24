const path = require('path');
const router = require('express').Router();
const passport = require('passport');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get(['/', '/login', '/register', '/reset-password', '/dashboard'], (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.post('/login', 
  userController.validateLogin,
  authController.login
);

module.exports = router;