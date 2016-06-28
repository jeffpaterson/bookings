const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');

require('locus')



router.use(helpers.currentUserVenueTableReservation);


//INDEX
router.get('/', (req, res) => {
	 knex('reservations').then((reservations) => {
	 	// eval(locus)
	 	knex('tables').then((tables) =>{
	 		knex('venues').then(venues=>{
	 			knex('hours').then(hours=>{

				
					var music = venues.map(el=>{
						return el.music.split(',');
					})
					
					var musicList = []

					music.forEach( n=>{
						return n.forEach(el=>{
							return musicList.push(el.replace(' ', ''))
						});
					})
					var musicFiltered = musicList.reduce((start, next)=>{
						// eval(locus)
						if (start.indexOf(next) === -1) {
							start.push(next)
						}

						return start;
						}, [''])


					var clientele = venues.map(el=>{
						return el.clientele.split(',');
					})
					
					var clienteleList = []

					clientele.forEach( n=>{
						return n.forEach(el=>{
							return clienteleList.push(el.replace(' ', ''))
						});
					})
					var clienteleFiltered = clienteleList.reduce((start, next)=>{
						// eval(locus)
						if (start.indexOf(next) === -1) {
							start.push(next)
						}

						return start;
						}, [''])
					
					var venuesFilter = venues.slice(0, venues.length);

					venuesFilter.unshift(' ');
					
					res.render('venues/index', {venues, venuesFilter, tables, musicFiltered, clienteleFiltered});
				})
	 		})
	 	})
	});
});



//FILTER
//WILL NEED TO CORRECT MOST NAMES WITH ACTUAL DB TERMS
router.get('/filter', (req, res) =>{
	knex('venues').
	knex('tables').whereRaw('seatsAvail >= ?', req.body.filter.seatNeeded).whereRaw('minCost <= ?', req.params.filter.maxPledge).where({
		name: req.body.filter.name,
		status: req.body.filter.status,
		music: req.body.filter.music,
		clientele: req.body.filter.clientele,
		reviews: req.body.filter.reviews,
		stars: req.body.filter.stars
	})
	res.send()
})

//SHOW
router.get('/:id', (req, res) => {
	knex('venues').where('id', req.params.id).first().then((venue) =>{
		res.render('venues/show', {venue});
	});
});



module.exports = router