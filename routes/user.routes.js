const router = require("express").Router();

router.get('/profile', async (req, res, next) => {
    res.json({
        message: 'User Profile'
    })
})

module.exports = router;