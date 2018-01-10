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
  Currency.findAll()
  .then((currencies) => {
    console.log('inside currency.findall')
    if(currencies.length) {
      currencies.forEach((currency, index) => {
        console.log('looping', index)
        axios({
          method: 'get',
          url: `https://api.coinmarketcap.com/v1/ticker/${req.params.currency_id}`
        });
      })
      .then((cryptos) => {
        console.log('inside api call')
        if (currency.investment_id) {
          Investment.findAll()
          .then((investments) => {
            console.log('inside investments')
            res.render('tracker/tracker', {
              cryptos: cryptos.data,
              currencies: currencies,
              investments: investments
            });
          })
          .catch((err) => {
            console.log('inside investments error', err)
            res.status(500).json(err);
           });
        } else {
          res.render('tracker/tracker', {
            cryptos: cryptos.data,
            currencies: currencies
          });
        }
      })
      .catch((err) => {
        console.log('inside api error', err)
        res.status(500).json(err);
      });
    } else {
      console.log('found nothing')
      res.render('tracker/tracker', {
        currencies: undefined
      });
    }
  })
};

controller.show = (req,res) => {
  Currency.findById(req.params.id)
  .then((currency) => {
    axios({
      method: 'get',
      url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
    });
  })
  .then((currency) => {
    if(currency.investment_id) {
      Investment.findById(currency.investment_id)
      .then((investment) => {
        res.render('tracker/currency', {currency: currency, investment: investment});
      })
      .catch((err) => {
    res.status(500).json(err);
  });
    } else {
      res.render('tracker/currency', {currency: currency})
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

controller.edit = (req,res) => {
  Investment.findById(req.params.id)
  .then((investment) => {
    res.render('tracker/edit', {investment: investment});
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

controller.update = (req,res) => {
  Investment.update({amount: req.body.amount}, req.params.id)
  .then(() => {
    res.redirect(`/tracker/${req.params.username}`);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

controller.new = (req,res) => {
  res.render('tracker/add');
};

controller.add = (req,res) => {
  Currency.create({
    user_id: req.user.id,
    currency_id: req.body.currency_id,
    investment_id: investment.id
  })
  .then((currency) => {
    Investment.create({
      user_id: req.user.id,
      currency: req.body.currency_id,
      amount: req.body.amount
    })
    .then((investment) => {
      res.redirect('/tracker/tracker');
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

controller.destroy = (req,res) => {
  Currency.destroy(req.params.id)
  .then(() => {
    res.redirect(`/tracker/${req.params.username}`)
  })
};

module.exports = controller;
