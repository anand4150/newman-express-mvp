const request = require('supertest');
const express = require('express');

const request = require('supertest');
const app = require('../index'); // Import the actual app

// Optional: If you need to close the server after tests
afterAll((done) => {
  // If the app exports the server instance
  if (app.server) app.server.close(done);
  else done();
});

// Tests for GET /api/hello endpoint
describe('GET /api/hello', () => {
  it('should return Hello World message', async () => {
    const response = await request(app).get('/api/hello');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello World!');
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