const express = require('express');
const authRoutes = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const MovieCollection = require('../models/MovieCollection');

authRoutes.get('/signup', (req, res, next) => {
    let data = {
        //layout: false
    };
    res.render('auth/signup', data);
});

authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === '' || password === '') {
        res.render('auth/signup', { message: 'Indicate username and password' });
        return;
    }

    User.findOne({ username }).then(user => {
        if (user !== null) {
            res.render('auth/signup', { message: 'The username already exists' });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass
        });

        newUser.save((err, user) => {
            console.log(user);
            if (err) {
                res.render('auth/signup', { message: 'Something went wrong' });
            } else {
                req.login(user, () => {
                    res.redirect('/create-rak');
                });
            }
        });
    });
});

authRoutes.get('/login', (req, res, next) => {
    let data = {
        //  layout: false
    };
    res.render('auth/login', data);
    // { message: req.flash('error') }
});

authRoutes.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true,
        passReqToCallback: true
    })
);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

authRoutes.get('/google', passport.authenticate('google', { scope: ['profile'] }));
authRoutes.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

authRoutes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = authRoutes;
