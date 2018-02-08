const path = require('path');
const router = require('express').Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get(['/login', '/register', '/forgot-password','/dashboard','/logout' ], (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

// router.get('/dashboard/:slug', (req, res) => {
//   res.render('dashboard');
// });

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