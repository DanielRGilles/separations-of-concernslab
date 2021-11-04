const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder(quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert(quantity);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
  static async getOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Here is the order for id ${id}`
    );

    const order = await Order.select(id);
    // order.id === some string
    // order.quantity === quantity

    return order;
  }
};
