

const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser')
const session = require('cookie-session');
const routes = require('./routes/index');
const Yelp  = require('yelp');
const knex = require('./db/knex');
const passport = require('passport');
const flash = require('connect-flash');
const helpers = require('./helpers/authHelpers');
app.locals.moment = require('moment')


app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'jade');

app.disable('x-powered-by');


// app.use(cookieParser())

app.use(session({secret: process.env.SECRET}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/auth', routes.auth)
app.use('/users', routes.users)
app.use('/venues', routes.venues)
app.use('/myres', routes.myres)
app.use('/venues/:venue_id/tables', routes.tables)
app.use('/venues/:venue_id/tables/:table_id/reservations', routes.reservations)

//update Venues tables with Yelp reviews
app.use(helpers.currentUserVenueTableReservation);

var yelp = new Yelp({
  consumer_key: process.env.YELPCK,
  consumer_secret: process.env.YELPCS,
  token: process.env.TOKEN,
  token_secret: process.env.TOKENS
})
  
var getYelp=function(){
  return knex.select("name").from('venues').then(data=>{
    // console.log(data)
    data.forEach(el=>{
      yelp.search({term: el.name, location: 'San Francisco'}).then(results=>{
        // console.log(results.businesses[0]);
        knex('venues').where("name", el.name).update({
          reviews: results.businesses[0].review_count,
          stars: results.businesses[0].rating_img_url
        }).then(function() {
          // NoOP
        });
      })
    })
  });
};
getYelp().then(function() {
});



//HOME static page
app.get("/", function(req, res){
  res.render('index');
});

//ABOUT static page
app.get("/about", function(req, res){
  res.render('about');
});

//CONTACT static page
app.get('/contact', function(req, res) {
  res.render('contact');
});

//GETTING STARTED static page
app.get('/getstarted', function(req, res) {
  res.render('getstarted');
});

//LOGIN static page
app.get('/login', function(req, res) {
  res.redirect('/auth/facebook');
});

//PAYMENT static page
// app.get('/payment', function(req, res) {
//   res.render('payment');
// });

//404 ERROR page (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.render('404');
});

app.listen(process.env.PORT || 3000, () => {
console.log("Server running, port 3000...")
})

module.exports = { app };