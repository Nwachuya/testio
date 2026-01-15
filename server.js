const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// CONFIGURATION: The subpath you are hosting on
const BASE_PATH = '/testio';

// 1. Log every request so you can see in Coolify logs what is happening
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});

// 2. Serve static files (HTML, CSS) specifically from the BASE_PATH
// This ensures requests to /test/styles.css map to the public folder
app.use(BASE_PATH, express.static(path.join(__dirname, 'public')));

// 3. Handle the main route (e.g., example.com/test)
app.get(BASE_PATH, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Test API endpoint (to check if fetching data works)
app.get(`${BASE_PATH}/api/ping`, (req, res) => {
    res.json({ message: "Pong! The backend is connected.", timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server running. accessible at http://localhost:${PORT}${BASE_PATH}`);
});

