const express = require('express');
const path = require('path');
const { createServer } = require('vite');

const app = express();
const port = process.env.PORT || 5000;

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Servir archivos estáticos en producción
    app.use(express.static('dist/public'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/public/index.html'));
    });
  } else {
    // Configurar Vite en desarrollo
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
    
    console.log('[vite] development server configured');
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[express] serving on port ${port}`);
  });
}

startServer().catch(console.error);