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
      'img-src': ["'self'", "data:", "https://res.cloudinary.com"],
    },
  },
});

module.exports = {
  securityMiddleware: [
    helmetConfig,
    xss(),
    limiter
  ]
};
