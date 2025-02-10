const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true // Add this line
});

const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"], // Allows scripts & blobs
      'img-src': ["'self'", "data:", "https://res.cloudinary.com"], // Allows Cloudinary images
      'worker-src': ["'self'", "blob:"], // Allows web workers
      'default-src': ["'self'"], // Restricts other resources
    },
  },
  crossOriginResourcePolicy: { policy: "same-origin" }, // Restricts external resource loading
  referrerPolicy: { policy: "no-referrer" }, // Prevents leaking referrer info
  frameguard: { action: "deny" }, // Prevents clickjacking attacks
  dnsPrefetchControl: { allow: false }, // Blocks DNS prefetching
  hidePoweredBy: true, // Hides "X-Powered-By: Express" header
  ieNoOpen: true, // Blocks old IE vulnerability
  noSniff: true, // Prevents MIME-type sniffing
  xssFilter: true, // Basic XSS protection
});

module.exports = {
  securityMiddleware: [
    helmetConfig,
    xss(),
    limiter
  ]
};
