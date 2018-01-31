const nodemailer = require('nodemailer');
const pug = require('pug');
const ejs = require('ejs');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => {
  const html = ejs.render(`
    <h2>Password Reset</h2>
    
    <p>Hello. You have requested a password reset. Please click the following button to continue on with resetting your password.</p>
    <p>Please note this link is only valid for the next hour.</p>

    <a href="<%= resetURL %>"><button>Reset My Password</button></a>

    <p>If you can't click the above button please visit <%= resetURL %></p>

    <p>If you didn't request this email, please ignore it.</p>
    `,
    { resetURL: options.resetURL }
  );
  
 // const html = ejs.renderFile(`${__dirname}/../views/${filename}.html`, options);
  const inlined = juice(html);
  return inlined;
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: `support <help@kooglobal.com>`,
    to: options.user.email,
    subject: options.subject,
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
