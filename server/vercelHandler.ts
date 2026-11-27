import { createApiApp } from './app';

let cachedApp: ReturnType<typeof createApiApp> | null = null;

function getApp() {
  if (!cachedApp) {
    cachedApp = createApiApp();
  }
  return cachedApp;
}

export default function handler(req: any, res: any): Promise<void> {
  return new Promise<void>((resolve) => {
    let settled = false;
    const done = () => {
      if (!settled) {
        settled = true;
        resolve();
      }
    };

    res.once('finish', done);
    res.once('close', done);

    try {
      const rawUrl = typeof req.url === 'string' ? req.url : '/api';
      try {
        const parsed = new URL(rawUrl, 'http://localhost');
        const rewrittenPath = parsed.searchParams.get('__vercel_path');

        if (rewrittenPath !== null) {
          parsed.searchParams.delete('__vercel_path');
          const cleanSubPath = rewrittenPath.replace(/^\/+/, '');
          const qs = parsed.searchParams.toString();
          req.url = `/api${cleanSubPath ? `/${cleanSubPath}` : ''}${qs ? `?${qs}` : ''}`;
          req.originalUrl = req.url;
        } else if (
          parsed.pathname === '/api/index' ||
          parsed.pathname === '/api/index.js' ||
          parsed.pathname === '/api/index.cjs' ||
          parsed.pathname === '/api/index.ts'
        ) {
          const qs = parsed.searchParams.toString();
          req.url = `/api${qs ? `?${qs}` : ''}`;
          req.originalUrl = req.url;
        }
      } catch {
        // Keep original req.url if URL parsing fails
      }

      const app = getApp();
      app(req, res);
    } catch (err: any) {
      console.error('[AgriVision AI] Serverless handler fatal error:', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(
          JSON.stringify({
            error: 'Máy chủ API gặp lỗi khởi tạo.',
            details: err?.message || String(err),
          })
        );
      }
      done();
    }
  });
}
