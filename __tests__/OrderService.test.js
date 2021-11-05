const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const { createOrder, updateOrder, deleteOrder } = require('../lib/services/OrderService');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('updates order with new quantity by id', async() => {
    
    await createOrder(2);
    await updateOrder(1, 3);
    const response = await Order.getAll();
    const expectation = [{ 'id':'1', 'quantity':3 }];
              
    expect(response).toEqual(expectation);
  });
  it('deletes order  by id', async() => {
    
    await createOrder(2);
    await deleteOrder(1);
    const response = await Order.getAll();
    const expectation = [];
              
    expect(response).toEqual(expectation);
  });
});
