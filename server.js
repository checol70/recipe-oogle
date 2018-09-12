const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
//const API = require("./routes/api-routes");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/recipeoogle";
const mongoose = require("mongoose");
const passport = require("passport")
const session = require("express-session");
const cookieParser = require("cookie-parser")
const config = require("./config");
const db = require("./models");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const API = require("./routes/api-routes");

//here is where we will put middleware
app.use(session({
    secret:"SuperDuperSecret",
    resave:false,
    saveUninitialized:true,
    cookie: {secure:true}
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

passport.use(new GoogleStrategy({
    clientID: config.id,
    clientSecret: config.secret,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        db.User.findOne({
            googleId: profile.id
        }).exec((err, user) => {
            if (err) console.log(`err ${err}`);
            if (user === null) {
                db.User.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    token: accessToken
                }).then(val => {
                    val.accessToken = accessToken;
                    return cb(err, val);
                })
            } else {
                db.User.findByIdAndUpdate(user._id,{token: accessToken}).exec((err,u)=>{
                    return cb(err, u);
                })
            }
        });
    }
));
function searchName(str){
    const lowerCase = str.toLowerCase();
    return lowerCase.replace(/\s/g, '');
}


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//here is auth, need to test it so it will be here until we figure it out


passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    db.User.findById(id, function (err, user) {
        done(err, user);
    });
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/auth/google' }),
function (req, res) {
    // Successful authentication, redirect home.
    const token = req.user.googleId;
    const displayName = req.user.displayName;
    res.redirect(`http://localhost:3000?token=${token}&displayName=${displayName}`);
});



API(app);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});
