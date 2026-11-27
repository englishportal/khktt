import { createApiApp } from '../server/app';

const app = createApiApp();

export default function handler(req: any, res: any) {
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
    } else if (parsed.pathname === '/api/index' || parsed.pathname === '/api/index.ts') {
      const qs = parsed.searchParams.toString();
      req.url = `/api${qs ? `?${qs}` : ''}`;
      req.originalUrl = req.url;
    }
  } catch {
    // Keep req.url as provided if URL parsing fails
  }

  return app(req, res);
}
