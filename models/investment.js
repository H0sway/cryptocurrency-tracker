const db = require('../db/config');
const Investment = {};

Investment.findAll = (user_id) => {
  return db.query(`
    SELECT * FROM investments WHERE user_id = $1 ORDER BY id ASC
    `,[user_id]);
};

Investment.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM investments WHERE id = $1
    `,[id]);
};

Investment.create = (investment) => {
  return db.one(`
    INSERT INTO investments (user_id, currency, amount) VALUES ($1, $2, $3) RETURNING *
    `,[investment.user_id, investment.currency, investment.amount]);
};

Investment.update = (investment, id) => {
  return db.none(`
    UPDATE investments SET amount = $1 WHERE id  = $2
    `,[investment.amount, id]);
};

Investment.destroy = (id) => {
  return db.none(`
    DELETE FROM investments WHERE id = $1
    `,[id]);
};

module.exports = Investment;
