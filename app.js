// Import dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(logger('dev'));
app.use(express.static('public'));

// Set the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Landing Page
app.get('/', (req,res) => {
  res.render('index');
});

// Routes

const authRouter = require('./routes/auth-routes');
app.use('/auth', authRouter);

const authHelpers = require('./services/auth/auth-helpers');
app.use(authHelpers.loginRequired)

app.use('/tracker', require('./routes/tracker-routes'));

app.get('*', (req,res) => {
  res.status(404).json({
    message: "You've come to the wrong neighborhood.",
  });
});

app.listen(PORT, () => {
  console.log(`Live on port ${PORT} but also in your hearts`);
});
