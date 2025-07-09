const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware básico
app.use(express.static('client'));

// Ruta básica para pruebas
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando', timestamp: new Date().toISOString() });
});

// Servir la aplicación React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`[express] serving on port ${port}`);
});