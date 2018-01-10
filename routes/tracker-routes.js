const express = require('express');
const Router = express.Router();
const controller = require('../controllers/tracker-controller');

Router.get('/', controller.home);
Router.get('/tracker', controller.tracker);
Router.get('/tracker/new', controller.new);
Router.get('/tracker/:currency_id', controller.show);
Router.get('/tracker/:currency_id/edit', controller.edit);
Router.put('/tracker/:currency_id', controller.update);
Router.post('/tracker', controller.add);
Router.delete('/tracker/:currency_id', controller.destroy);

module.exports = Router;
