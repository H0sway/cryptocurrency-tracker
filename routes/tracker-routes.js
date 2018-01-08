const express = require('express');
const Router = express.Router();
const controller = require('../controllers/tracker-controller');

Router.get('/', controller.login)
Router.get('/:username', controller.tracker);
Router.get('/:username/new', controller.add);
Router.get('/:username/:currency_id', controller.show);
Router.get('/:username/:currency_id/edit', controller.edit);
Router.put('/:username/:currency_id', controller.update);
Router.post('/:username', controller.create);
Router.delete('/:username/:currency_id', controller.destroy);

module.exports = Router;
