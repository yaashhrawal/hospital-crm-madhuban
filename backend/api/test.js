// Simple test endpoint for Vercel
module.exports = (req, res) => {
    res.json({
        status: 'ok',
        message: 'Test endpoint working!',
        timestamp: new Date().toISOString()
    });
};
