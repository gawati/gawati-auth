const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'database connection error:'));

db.once('open', function() {
  console.log('connected to database:', process.env.DATABASE);
});

require('./server/models/User');
require('./server/handlers/passport');

const app = require('./server/app');

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on localhost:${server.address().port}`);
});