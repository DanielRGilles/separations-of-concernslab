const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });
  it('retrieves an order in our database by id', async() => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    const order = res.body; 
    const retrievedOrder = await request(app)  
      .get(`/api/v1/orders/${order.id}`);
      
    expect(retrievedOrder.body).toEqual(order);
  });
  it('retrieves all orders in our database', async() => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });
    const resToo = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 9 });
    const order = [res.body, resToo.body]; 
    const retrievedOrder = await request(app)  
      .get('/api/v1/orders/');
 
    expect(retrievedOrder.body).toEqual(order);
  });
  it('retrieves an order in our database by id and updates it', async() => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });
   
    const res = await request(app)
      .patch('/api/v1/orders/1')
      .send({ quantity: 5 });

    const order = res.body; 
    const retrievedOrder = await request(app)  
      .get('/api/v1/orders/1');
      
    expect(retrievedOrder.body).toEqual(order);
  });
  it('retrieves an order in our database by id and deletes it', async() => {
    await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 15 });
   
    await request(app)
      .delete('/api/v1/orders/1');
   
    const retrievedOrder = await request(app)  
      .get('/api/v1/orders');
      
    expect(retrievedOrder.body).toEqual([]);
  });
});

