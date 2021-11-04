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
  
  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order ${id} has been updated with quantity ${quantity}`
    );

    const order = await Order.update(id, quantity);
    return order;
  }
  static async deleteOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order #${id} has been deleted`
    );

    const order = await Order.delete(id);
    return order;
  }
};
