const db = require('../db/config');
const Currency = {};

Currency.findAll = (user_id) => {
  return db.query(`
    SELECT * FROM currencies AS c
    JOIN users ON c.user_id = users.id
    JOIN investments ON c.investment_id = investments.id
    WHERE c.user_id = $1
    `,[user_id]);
};

Currency.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM currencies
    WHERE id = $1
    `,[id]);
};

Currency.create = (currency) => {
  return db.one(`
    INSERT INTO currencies (user_id, currency_id, investment_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [currency.user_id, currency.currency_id, currency.investment_id]);
};

Currency.destroy = (id) => {
  return db.none(`
    DELETE FROM currencies WHERE id = $1
    `);
};

module.exports = Currency;
