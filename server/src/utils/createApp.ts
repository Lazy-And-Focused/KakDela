import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import routes from '../routes';
import store from 'connect-mongo';

require('../strategies/discord');

export const createApp = (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());

    app.use(session({
        secret: 'KLAODHIGlkjbklJKLBAZFDFBLsjgnfpoanjaflsodgknpoisJSlkzklcjxnvlkznxclk',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 7 },
        store: store.create({
            mongoUrl: 'mongodb://127.0.0.1/chat_with_discord_auth'
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use((req, res, next) => setTimeout(() => next(), 700));

    app.use('/api', routes);

    return app;
};