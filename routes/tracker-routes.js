const express = require('express');
const Router = express.Router();
const controller = require('../controllers/tracker-controller');

Router.get('/', controller.home);
Router.get('/tracker', controller.tracker);
Router.get('/tracker/new', controller.new);
Router.get('/tracker/:id', controller.currency);
Router.get('/tracker/:id/edit', controller.edit);
Router.put('/tracker/:id', controller.update);
Router.post('/tracker', controller.add);
Router.delete('/tracker/:id', controller.destroy);

module.exports = Router;
