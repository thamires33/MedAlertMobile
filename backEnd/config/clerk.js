const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const clerkMiddleware = ClerkExpressWithAuth({
  apiKey: process.env.CLERK_API_KEY, // Certifique-se de definir esta variável no seu .env
});

module.exports = clerkMiddleware;
