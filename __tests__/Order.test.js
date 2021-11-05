const Order = require('../lib/models/Order');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');


jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('retrieves all orders', async() => {
    const orderOne = await Order.insert(2);
    const orderTwo = await Order.insert(3);
    const response = await Order.getAll();
              
    expect(response).toEqual(expect.arrayContaining([orderOne, orderTwo]));
  });
  it('retrieves an order by id', async() => {
    const orderOne = await Order.insert(2);
    const response = await Order.getById(1);
              
    expect(response).toEqual(orderOne);
  });
  it('retrieves an order by id and updates it', async() => {
    await Order.insert(2);
    await Order.update(1, 5);
    const response = await Order.getById(1);
              
    expect(response).toEqual({ 'id': '1', 'quantity': 5 });
  });
  it('creates an order and then deletes it by id', async() => {
    await Order.insert(2);
    await Order.delete(1);
    const response = await Order.getAll();
              
    expect(response).toEqual([]);
  });
});
