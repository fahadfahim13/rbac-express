const router = require("express").Router();

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');


const routes = [
    {
        url: '/users',
        route: userRoutes
    },
    {
        url: '/auth',
        route: authRoutes
    }
]

routes.forEach((r) => router.use(r.url, r.route));

module.exports = router;