// Vercel Serverless Function Entry Point
// This properly wraps the Express app for Vercel's serverless platform

const app = require('../server');

// Export handler for Vercel
// Vercel will call this function for each request
module.exports = async (req, res) => {
    // Let Express handle the request
    return app(req, res);
};
