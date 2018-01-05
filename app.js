// Import dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(logger('dev'));

// Set the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Landing Page
app.get('/', (req,res) => {
  res.render('index');
});

// Routes
app.use('/tracker', require('.routes/tracker-routes'));

app.get('*', (req,res) => {
  res.status(404).json({
    message: "You've come to the wrong neighborhood.",
  });
});

app.listen(PORT, () => {
  console.log(`Live on port ${PORT} but also in your hearts`);
});
