import express from "express";
import oauthRouter  from './oauth.route';
import authRouter  from './auth.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/oauth',
        route: oauthRouter,
    },
    {
        path: '/auth',
        route: authRouter
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
  