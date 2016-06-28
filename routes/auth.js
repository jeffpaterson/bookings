const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
// const bcrypt = require('bcrypt');
const helpers = require('../helpers/authHelpers');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// eval(require("locus"))
if(process.env.NODE_ENV === "production") {
  var callback = "https://lonelytable-app.herokuapp.com/auth/facebook/callback"
} else {
  var callback = "http://localhost:3000/auth/facebook/callback"
}

passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_KEY,
	clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: callback,
  	scope: ['email', 'public_profile']
  }, (accessToken, refreshToken, profile, done)=>{
  	knex('users').where('fb_id', profile.id).first().then(user=>{
  		if(user) {
  			return done(null, user);
  		}
  		else {

  			knex('users').insert({fb_id: profile.id, username: profile.displayName}, '*').then(user=>{
  				return done(null, user[0]);
  			});
  		}
  	}).catch(err=>{
  		return done(err, null);
  	});
  }));

passport.serializeUser((user, done)=>{
	done(null, user.id);
});

passport.deserializeUser((id, done)=>{
	knex('users').where('id', id).first().then(user=>{
		done(null, user);
	}).catch(err=>{
		done(err, false);
	});
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', function(req,res,next){
  // console.log("are we in here?")
  passport.authenticate('facebook',function(err, user) {
    
    if(err) return next(err)
    else {
      req.logIn(user, function(err) {
      if(err){
        req.flash("loginMessage", err)
        res.redirect('/auth/login');
      }
      else{
        
        // AFTER MORE SETUP, FIND WHAT 'user' is and send info to further add info for databse

        // eval(require('locus'))
        knex('users').where('fb_id', user.fb_id).first().then(user=>{
          // eval(require('locus'))
          if (!user.alias){
            res.render('users/new', {user: user});
          }
          else {
            // Successful authentication, redirect home.
            // res.locals.user = req.user;
            res.redirect(req.session.returnTo || '/');
            delete req.session.returnTo;
          }
        })
      }
    })

    }
  })(req, res, next)
});

router.get('/login', (req, res)=>{
	res.render('auth/login', {message: req.flash('loginMessage')});
});


router.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});


module.exports = router