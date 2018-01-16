const Currency = require('../models/currency');
const Investment =  require('../models/investment');
const User = require('../models/user');
const axios = require('axios');

const controller = {};

controller.home = (req,res) => {
  axios({
    method: 'get',
    url: `https://api.coinmarketcap.com/v1/ticker/?limit=20`
  })
  .then((cryptos) => {
    res.render('tracker/table', {
      cryptos: cryptos.data
    });
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

controller.tracker = (req,res) => {
  console.log('hit the tracker method', req.user);
  Currency.findAll(req.user.id)
  .then((currencies) => {
    res.render('tracker/tracker', {
      currencies: currencies,
    });
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

controller.currency = (req,res) => {
  Currency.findById(req.params.id)
  .then((currency) => {
    axios({
      method: 'get',
      url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
    })
    .then((crypto) => {
      console.log(crypto.data);
      if (currency.investment_id) {
        Investment.findById(currency.investment_id)
        .then((investment) => {
          res.render('tracker/currency', {
            currency: currency,
            crypto: crypto.data,
            investment: investment,
          });
        })
        .catch((err) => {
          console.log('investment error', err)
        });
      } else {
        res.render('tracker/currency', {
          currency: currency,
          crypto: crypto.data,
        })
      }
    })
  })
  .catch((err) => {
    console.log('currency error', err);
  });
};

controller.edit = (req,res) => {
  Currency.findById(req.params.id)
  .then((currency) => {
    Investment.findById(currency.investment_id)
    .then((investment) => {
      res.render('tracker/edit', {
        currency: currency,
        investment: investment,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

controller.update = (req,res) => {
  Currency.findById(req.params.id)
  .then((currency) => {
    Investment.update({
      user_id: req.user.id,
      currency: currency.currency_id,
      amount: req.body.amount,
    }, req.params.currency_id)
    .then(() => {
      res.redirect(`/tracker/tracker/${req.params.id}`);
    })
    .catch((err) => {
     res.status(400).json(err);
    });
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

controller.new = (req,res) => {
  console.log('rendering add.ejs')
  res.render('tracker/add');
};

controller.add = (req,res) => {
  Investment.create({
    user_id: req.user.id,
    currency: req.body.currency_id,
    amount: req.body.amount
  })
  .then((investment) => {
    Currency.create({
    user_id: req.user.id,
    currency_id: req.body.currency_id,
    investment_id: investment.id
    })
    .then((currency) => {
      res.redirect('/tracker/tracker');
    })
    .catch((err) => {
      console.log('currency.create error', err)
      res.status(500).json(err);
    });
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json(err);
  });
};

controller.destroy = (req,res) => {
  Currency.destroy(req.params.id)
  .then(() => {
    res.redirect('/tracker/tracker')
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

module.exports = controller;
