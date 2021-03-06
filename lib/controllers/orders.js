const { Router } = require('express');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/', async(req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const order = await OrderService.createOrder(req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.getById(id);
      res.send(order);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const order = await Order.getAll();
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .patch('/:id', async(req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const { id } = req.params;
      const order = await OrderService.updateOrder(id, req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      
      const { id } = req.params;
      await OrderService.deleteOrder(id);
      
      res.status(204);
      res.send('success');
    } catch(err) {
      next(err);
    }
  });
