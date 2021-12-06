const Sentry = require('@sentry/node')

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

Sentry.init({ dsn: "https://bf57b19ffefb46efbef467dfc5f57de7@o87286.ingest.sentry.io/6089805" });
app.use(Sentry.Handlers.requestHandler());

app.use('/api', createProxyMiddleware({ 
    target: 'http://www.example.org', changeOrigin: true,
    
    onProxyReq: (proxyReq, req, res) => {
        console.log("> onProxyReq")
        
        // add custom header to request
        // proxyReq.setHeader('x-added', 'foobar');
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log("> onProxyRes")

        // console.log("proxRes", proxyRes) // x-added is available on the proxyRes object
        // proxyRes.headers['x-added'] = 'foobar'; // add new header to response
        // delete proxyRes.headers['x-removed']; // remove header from response
    }
}));

app.listen(3000);