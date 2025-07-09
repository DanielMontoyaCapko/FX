import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = process.env.PORT || 5000;

async function startServer() {
  if (process.env.NODE_ENV === "production") {
    // En producción, servir archivos estáticos
    app.use(express.static("dist/public"));
    app.get("*", (req, res) => {
      res.sendFile(join(process.cwd(), "dist/public/index.html"));
    });
  } else {
    // En desarrollo, usar Vite dev server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      clearScreen: false,
      logLevel: 'info'
    });
    
    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
    
    console.log(`[vite] development server configured`);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[express] serving on port ${port}`);
  });
}

startServer().catch(console.error);