const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');
const moment = require('moment')

require('locus')


router.use(helpers.ensureAuth);
router.use(helpers.currentUserVenueTableReservation);


router.get('/', (req, res)=>{
	knex('reservations').where('user_id', req.user.id).then(reservations=>{
		knex('tables').where('id', reservations[0].table_id).first().then(table=>{
			knex('venues').where('id', table.venue_id).first().then(venue=>{
				var atTable = [];

				knex('reservations').join('users', 'users.id', 'reservations.user_id').then(currentUsers=>{

					currentUsers.reduce((start, next)=>{
						if (start.indexOf(next.user_id) === -1) {

							atTable.push(next)
							start.push(next.user_id);
							return start;
						}
						else {
							return start;
						}
					}, [])

					res.render('myres/index', {atTable, venue, table, reservations})
				});
			})
		})
	})
})


module.exports = router