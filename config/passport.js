const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model/signUp-model');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({ usernameField: 'email' },
    async function (email, password, done) {
        try {
            // Find user by email
            const user = await userModel.findOne({ email: email });
            console.log(user, 'user login');

            if (!user) {
                // User not found
                return done(null, false, { message: 'Invalid username or password' });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            // Authentication successful
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
