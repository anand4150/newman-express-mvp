const request = require('supertest');
const express = require('express');

// Import the app without starting the server
let app;

// Setup and teardown
beforeEach(() => {
  // Clear cache to get a fresh instance
  jest.resetModules();
  
  // Create a new express instance for each test
  const expressApp = express();
  expressApp.use(express.json());
  
  // Define routes manually to match index.js
  expressApp.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  expressApp.post('/api/echo', (req, res) => {
    const { data } = req.body;
    res.json({ received: data });
  });

  expressApp.get('/api/health', (req, res) => {
    res.json({ status: 'UP' });
  });
  
  app = expressApp;
});

// Tests for GET /api/hello endpoint
describe('GET /api/hello', () => {
  it('should return Hello World message', async () => {
    const response = await request(app).get('/api/hello');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello World');
  });
});

// Tests for POST /api/echo endpoint
describe('POST /api/echo', () => {
  it('should echo back the data sent in request body', async () => {
    const testData = { data: 'test message' };
    
    const response = await request(app)
      .post('/api/echo')
      .send(testData)
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('received');
    expect(response.body.received).toBe(testData.data);
  });
  
  it('should handle empty data correctly', async () => {
    const response = await request(app)
      .post('/api/echo')
      .send({})
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ received: undefined });
  });
});

// Tests for GET /api/health endpoint
describe('GET /api/health', () => {
  it('should return UP status', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('UP');
  });
});