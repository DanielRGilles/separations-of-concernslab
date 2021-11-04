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
});
