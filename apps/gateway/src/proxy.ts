import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const setupProxies = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}

export default setupProxies;
