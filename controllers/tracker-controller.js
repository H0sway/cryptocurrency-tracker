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
    if (currencies.length){
      currencies.forEach((currency) => {
        axios({
          method: 'get',
          url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
        })
        .then((cryptos) => {
          console.log('inside api call');
          if (currency.investment_id) {
            Investment.findAll(req.user.id)
            .then((investment) => {
              console.log('inside investments');
              res.render('tracker/tracker', {
                crypto: cryptos.data,
                currencies: currencies,
                currency: currency,
                investment: investment
              })
            })
            .catch((err) => {
              console.log('inside api error', err)
            })
          } else {
            res.render('tracker/tracker', {
              crypto: cryptos.data,
              currencies: currencies,
              currency: currency,
              investment: undefined
            })
          }
        })
        .catch((err) => {
          console.log('inside investment catch', err)
        })
      }) //end of currencies.forEach
    } else {
      res.render('tracker/tracker', {
        currencies: undefined
      })
    }
  }) //end of currency.findall.then
  .catch((err) => {
    console.log('inside currency catch', err)
  })
}// end of tracker method

// controller.tracker = (req,res) => {
//   console.log('hit the tracker method', req.user)
//   Currency.findAll(req.user.id)
//   .then((currencies) => {
//     console.log('inside currency.findall')
//     if(currencies.length) {
//       currencies.forEach((currency, index) => {
//         console.log('looping', index)
//         axios({
//           method: 'get',
//           url: `https://api.coinmarketcap.com/v1/ticker/${currencies.currency_id}`
//         })
//       })
//       .then((cryptos) => {
//         console.log('inside api call')
//         if (currency.investment_id) {
//           Investment.findAll()
//           .then((investments) => {
//             console.log('inside investments')
//             res.render('tracker/tracker', {
//               cryptos: cryptos.data,
//               currencies: currencies,
//               investments: investments
//             });
//           })
//           .catch((err) => {
//             console.log('inside investments error', err)
//             res.status(500).json(err);
//            });
//         } else {
//           res.render('tracker/tracker', {
//             cryptos: cryptos.data,
//             currencies: currencies
//           });
//         }
//       })
//       .catch((err) => {
//         console.log('inside api error', err)
//         res.status(500).json(err);
//       });
//     } else {
//       console.log('found nothing')
//       res.render('tracker/tracker', {
//         currencies: undefined
//       });
//     }
//   })
// };

controller.show = (req,res) => {
  Currency.findById(req.params.id)
  .then((currency) => {
    axios({
      method: 'get',
      url: `https://api.coinmarketcap.com/v1/ticker/${req.params.currency_id}`
    });
  })
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
    res.redirect(`/tracker/${req.params.username}`)
  })
};

module.exports = controller;
