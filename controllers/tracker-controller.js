const Currency = require('../models/currency');
const Investment =  require('../models/investment');
const axios = require('axios');

const controller = {};

controller.login = (req,res) => {
  res.render('tracker/login');
};

controller.tracker = (req,res) => {
  Currency.findAll()
  .then((currency) => {
    res.render('tracker/tracker')
  })
}

controller.new = (req,res) => {
  axios({
    method: 'get',
    url: `https://api.coinmarketcap.com/v1/ticker/${req.body.currency_id}`
  })
  .then((data) => {
    res.render('tracker/new', {
      data: data.data,
    });
  })
  .catch((err) => {
    res.status(500).json(err)
  });
};

module.exports = controller;
