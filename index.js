// Install dependencies: npm install express cors
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

// Simple GET API
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// POST API that echoes received data
app.post('/api/echo', (req, res) => {
    const { data } = req.body;
    res.json({ received: data });
});

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({ status: 'UP' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
