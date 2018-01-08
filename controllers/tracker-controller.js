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

controller.edit = (req,res) => {
  Investment.findById(req.params.id)
  .then(investment => {
    res.render('tracker/edit', {investment: investment});
  })
  .catch((err) => {
    res.status(500).json(err)
  });
};

controller.update = (req,res) => {
  Investment.update({amount: req.body.amount}, req.params.id)
  .then(() => {
    res.redirect(`/tracker/${req.params.username}`);
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
    res.redirect(`/tracker/${req.params.username}`);
  })
  .catch((err) => {
    res.status(500).json(err)
  });
};

controller.destroy = (req,res) => {
  Currency.destroy(req.params.id)
  .then(() => {
    res.redirect()
  })
};

module.exports = controller;
