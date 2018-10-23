const express = require("express");
const passport = require("passport")
const session = require("express-session");

const app = express();


const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
//const API = require("./routes/api-routes");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/recipeoogle";
const mongoose = require("mongoose");

const config = (process.env.NODE_ENV =="production"?{id: process.env.id, secret: process.env.id}: require("./config"));
console.log(config)
const db = require("./models");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const API = require("./routes/api-routes");
const MongoStore = require("connect-mongo")(session);
//here is where we will put middleware
sess = {
    store: new MongoStore({mongooseConnection: mongoose.connection }),
    secret:"SuperDuperSecret",
    resave:false,
    saveUninitialized:true,
    cookie: {}
}
console.log(config);
if(app.get("env")==="production"){
    app.set("trust proxy", 1);
    sess.cookie.secure = true;
}
app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

passport.use(new GoogleStrategy({
    clientID: config.id,
    clientSecret: config.secret,
    callbackURL: "https://recipeoogle.herokuapp.com/auth/google/callback"
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
    const displayName = req.user.displayName;
    //stupid thing needs a change to run

    res.redirect(`https://recipeoogle.herokuapp.com/?displayName=${displayName}`);
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
