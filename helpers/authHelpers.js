const knex = require('../db/knex');

require('locus')

module.exports = {
	currentUserVenueTableReservation: (req, res, next) => { 
		if(!req.isAuthenticated()) {
			return next();
		}
		else {
			res.locals.user = req.user;

			knex('tables').where({id: req.params.table_id}).first().then(table=>{
				knex('venues').where({id: req.params.venue_id}).first().then(venue=>{
					res.locals.table = table;
					res.locals.venue = venue;
					if(req.user) {
						knex('reservations').where('user_id', req.user.id).then((reservations) => {
						res.locals.userReservations = reservations;
						return next();
						})
					}
					else {
						return next();
					}
				})
			});
			// delete res.locals.currentUserVenueTableReservation.password;
		}
	},


	ensureAuth: (req, res, next) =>{
		if(req.originalUrl === "/auth/facebook") {
			return next();
		}
		else if(req.isAuthenticated()){

			return next();
		}
		else{
			req.session.returnTo = req.originalUrl;
			req.flash('loginMessage', 'Please log in');
			res.redirect('/auth/login');
		}
	},

	ensureAuthForP: (req, res, next)=>{
		if(req.user.id === +req.params.user_id) {
			return next();
		}
		else {
			req.flash('loginMessage', 'Cannot update that post');
			res.redirect(`/users/${req.params.user_id}/photos`);
		}

	}

}
