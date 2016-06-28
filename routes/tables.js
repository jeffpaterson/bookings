const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');

require('locus')

router.use(helpers.currentUserVenueTableReservation);


//INDEX
router.get('/', (req, res) => {
	 knex('tables').where('venue_id', req.params.venue_id).then((tables) => {
		knex('venues').where('id', req.params.venue_id).first().then((venue)=>{
			res.render('tables/index', {tables, venue});
		})
	});
});


//SHOW
router.get('/:id', (req, res) => {
	knex('tables').where('id', req.params.id).first().then((table) =>{
		res.render('tables/show', {table});
	});
});

//EDIT
router.get('/:id/edit', (req, res) => {
	knex('tables').where('id', req.params.id).first().then((table)=>{
		res.render('tables/edit', {table});
	});
});


//PUT
router.put('/:id', (req, res) => {
	knex('tables').where('id', req.params.id).update({username: req.body.user.username, password: hash}).then(()=>{
		res.redirect('/tables');
	});
});


module.exports = router