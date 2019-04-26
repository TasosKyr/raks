require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const authRoutes = require('./routes/auth');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const flash = require('connect-flash');

mongoose.Promise = Promise;
mongoose
    .connect('mongodb://localhost/raks-v1', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

app.use(flash());
passport.use(
    new LocalStrategy(
        {
            passReqToCallback: true
        },
        (req, username, password, next) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next(null, false, { message: 'Incorrect username' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return next(null, false, { message: 'Incorrect password' });
                }

                return next(null, user);
            });
        }
    )
);

// Express-session middleware configuration
app.use(
    session({
        secret: 'our-passport-local-strategy-app',
        resave: true,
        saveUninitialized: true
    })
);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express-session middleware initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: '890495513413-sjmkdsk1tvao47blb884be6dh5hjj6ou.apps.googleusercontent.com',
            clientSecret: 'lw4n4htR-OkJ4WDH9AD4fUNH',
            callbackURL: 'http://localhost:3000/google/callback'
        },
        (request, accessToken, refreshToken, profile, done) => {
            console.log('profile: ', profile);
            User.findOne({ googleId: profile.id })
                .then(user => {
                    if (user) return done(null, user);
                    User.create({ googleId: profile.id }).then(newUser => {
                        done(null, newUser);
                    });
                })
                .catch(err => {
                    console.log(err);
                    done(err);
                });
        }
    )
);

// Express View engine setup
app.use(
    require('node-sass-middleware')({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        sourceMap: true
    })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use('/', authRoutes);

// login routes

mongoose.Promise = Promise;
// mongoose
//     .connect('mongodb://localhost/basic-auth', { useNewUrlParser: true })
//     .then(() => {
//         console.log('Connected to Mongo!');
//     })
//     .catch(err => {
//         console.error('Error connecting to mongo', err);
//     });

// default value for title local
app.locals.title = 'raks';

const index = require('./routes/index');
app.use('/', index);

const createRak = require('./routes/create-rak');
app.use('/', createRak);

const editRak = require('./routes/edit-rak');
app.use('/edit-rak', editRak);

const profileRouter = require('./routes/profile');
app.use('/', profileRouter);
hbs.registerPartials(__dirname + '/views/partials');

module.exports = app;
