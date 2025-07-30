   if(process.env.NODE_ENV != "production"){
     require("dotenv").config();
   }  
    
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    // const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
    const dbUrl = process.env.ATLASDB_URL;
    const path = require("path");
    const methodOverride = require("method-override");
    const ejsMate = require("ejs-mate");
    const session = require("express-session");
    const MongoStore = require('connect-mongo');
    const flash = require("connect-flash");
    const passport = require("passport");
    const localStrategy = require("passport-local");
    const User = require("./models/user.js");

    const listingRouter = require("./routers/listing.js");
    const reviewRouter = require("./routers/review.js");
    const userRouter = require("./routers/user.js");
    main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });
    async function main(){
        await mongoose.connect(dbUrl);
    }
    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));
    app.use(express.urlencoded({extended:true}));
    app.use(methodOverride("_method"));
    app.engine('ejs',ejsMate);
    app.use(express.static(path.join(__dirname,"/public")));

    const store = MongoStore.create({
        mongoUrl: dbUrl,
        crypto: {
            secret:"mysupersecretcode"
        },
        touchAfter: 24 * 3600,
     });
     store.on("error", () =>{
        console.log("Error in MONGO SESSION STORE", err);
     });

    const sessionOptions = {
        store,
        secret: "mysupersecretcode",
        resave: false,
        saveUninitialized: true,
        cookie:{
            expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        },
    };

 

    app.use(session(sessionOptions));
    app.use(flash());

    // Configuration using passport strategy
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Middleware for sessions
    app.use((req,res,next) =>{
        res.locals.success = req.flash("success");
        res.locals.error = req.flash("error");
        res.locals.currUser = req.user;
        next();
    })

    // Use listing routes
    app.use("/listings",listingRouter);
    // use review routes
    app.use("/listings/:id/reviews",reviewRouter);
    app.use("/",userRouter);

    //For Different root which does not exit

    // app.all("*", (req, res, next) => {
    //     next(new ExpressError(404, "Page Not Found"));
    // });

    //  Middleware to handel the error

    app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { message });
    });

    app.listen(8080,()=>{
        console.log("server is listening to port 8080");
    });

