const Currency = require('../models/currency');
const Investment =  require('../models/investment');
const axios = require('axios');

const controller = {};

controller.login = (req,res) => {
  res.render('tracker/login');
};

controller.tracker = (req,res) => {
  Currency.findAll()
  .then(currencies => {
    currencies.forEach( currency => {
      axios({
        method: 'get',
        url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
  });
    });
  })
  .then((currencies => {
    res.render('tracker/tracker', {currencies: currencies});
  })
  .catch((err) => {
    res.status(500).json(err)
  });
};

controller.show = (req,res) => {
  Currency.findById(req.params.id)
  .then(currency => {
    axios({
      method: 'get',
      url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
    });
  })
  .then(currency => {
    res.render('tracker/currency', {currency: currency});
  })
  .catch((err) => {
    res.status(500).json(err)
  });
};

controller.new = (req,res) => {
  Currency.create({
    user_id: req.body.user_id,
    currency_id: req.body.currency_id
  })
  .then((data) => {
    res.redirect('tracker/tracker');
  })
  .catch((err) => {
    res.status(500).json(err)
  });
};


module.exports = controller;
