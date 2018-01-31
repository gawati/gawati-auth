const path = require('path');
const router = require('express').Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get(['/login', '/register', '/forgot-password' ], (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
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

router.post('/forgot-password',
  (req, res, next) => {
    console.log('POST to /forgot-password', req.body); 
    next();
  },
  userController.validateForgotPassword,
  authController.forgotPassword
);

router.get('/reset-password/:token',
  authController.reset
);

// router.get('/reset-password', (req, res) => {
//   // console.log('in router'. req.tk);
//   res.render('reset-password');
// });

router.post('/reset-password',
  (req, res, next) => {
    console.log('POST to /reset-password', req.body); 
    next();
  },
  authController.confirmedPasswords,
  authController.update
);

module.exports = router;