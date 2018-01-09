const Currency = require('../models/currency');
const Investment =  require('../models/investment');
const User = require('../models/user');
const axios = require('axios');

const controller = {};

controller.home = (req,res) => {
  User.findByUserName(req.params.username)
  .then((user) => {
    axios({
    method: 'get',
    url: `https://api.coinmarketcap.com/v1/ticker/?limit=20`
    })
    .then((cryptos) => {
      res.render('tracker/table', {
        cryptos: cryptos.data,
        user: user
      });
    })
  })
  .catch((err) => {
    res.status(500).json(err);
  });
};

controller.tracker = (req,res) => {
  Currency.findAll()
  .then((cryptos) => {
    currencies.forEach((crypto) => {
      axios({
        method: 'get',
        url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
  });
    });
  })
  .then((currencies) => {
    if(currency.investment_id) {
      Investment.findAll()
      .then((investments) => {
        res.render('tracker/tracker', {currencies: currencies, investments: investments});
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    } else {
      res.render('tracker/tracker', {currencies: currencies});
    }
  })
  .catch((err) => {
    res.status(500).json(err);
  });
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
      .then(investment => {
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

controller.add = (req,res) => {
  res.render('/tracker/add');
}

controller.create = (req,res) => {
  Currency.create({
    user_id: req.body.user_id,
    currency_id: req.body.currency_id
  })
  Investment.create ({
    amount: req.body.amount
  })
  .then((data) => {
    res.redirect('tracker/tracker');
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
