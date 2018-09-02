const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
//const API = require("./routes/api-routes");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/recipeoogle";
const mongoose = require("mongoose");
const passport = require("passport")

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
var db = require("./models");
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


//here is auth, need to test it so it will be here until we figure it out
const config = require("./config");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.id,
    clientSecret: config.secret,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        db.User.findOne({
            googleId: profile.id
        }).exec((err, user) => {
            if(err)console.log(`err ${err}`);
            console.log(`user: ${user}`)
            console.log(`idtype: ${typeof profile.id}`)
            if (user === null) {
                console.log("need to create user!")
                db.User.create({
                    googleId: profile.id,
                    displayName: profile.displayName
                }).then(val => {
                    console.log(`val:${val}`)
                    return cb(err, val);
                })
            } else{
                console.log("previous user!")
                return cb(err, user);
            }
        });
    }
));
app.use(passport.initialize())
//app.use(express.session({ secret: config.clientSecret }))
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    db.User.findById(id, function (err, user) {
        done(err, user);
    });
});
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });



//API(app);
// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});
