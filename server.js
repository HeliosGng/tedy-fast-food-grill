import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const distDir = path.join(__dirname, 'dist');

// Cloud Run / container health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// If dist directory exists, serve it
if (fs.existsSync(distDir)) {
  // Static assets with caching
  app.use(
    express.static(distDir, {
      maxAge: '1h',
      etag: true,
    })
  );

  // Single Page Application routing fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(503).send('Application is building. Please wait a moment and refresh.');
  });
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Cloud Run] Server is running on port ${PORT}`);
});

// Graceful shutdown for Cloud Run container lifecycle
process.on('SIGTERM', () => {
  console.log('[Cloud Run] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('[Cloud Run] Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[Cloud Run] SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('[Cloud Run] Process terminated');
    process.exit(0);
  });
});
