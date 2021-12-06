// import * as Sentry from "@sentry/node";
const Sentry = require('@sentry/node')

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// SENTRY
Sentry.init({ dsn: "https://bf57b19ffefb46efbef467dfc5f57de7@o87286.ingest.sentry.io/6089805" });
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
app.listen(3000);