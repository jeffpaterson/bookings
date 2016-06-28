const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('../db/knex');
const helpers = require('../helpers/authHelpers');



router.use(helpers.currentUserVenueTableReservation);
router.use(helpers.ensureAuth);


//INDEX
router.get('/', (req, res) => {
	 knex('users').then((users) => {
		res.render('users/index', {
			users, 
			message: req.flash('loginMessage')
		});
	});
});

//NEW
router.get('/new', (req, res) => {
	res.render('users/new');
});

//SHOW
router.get('/:id', (req, res) => {
	knex('users').where('id', req.params.id).first().then((user)=>{
		res.render('users/show', {user})
	});
});




//EDIT
router.get('/:id/edit', (req, res) => {
	knex('users').where('id', req.params.id).first().then((user)=>{
		res.render('users/edit', {user});
	});
});

//PATCH
router.patch('/', (req, res) => {
	var user = req.body.user;
	knex('users').where('fb_id', user.fb_id).update({alias: user.alias, dob: user.dob, profile_pic: user.profile_pic, blurb: user.blurb}).then(()=>{
		// req.flash('newUser', 'Added New User!');
		res.redirect(req.session.returnTo || '/venues');
    delete req.session.returnTo;
	});
});


//PUT
router.put('/:id', (req, res) => {
	var user = req.body.user;
	knex('users').where('id', req.params.id).update({alias: user.alias, profile_pic: user.profile_pic, blurb: user.blurb}).then(()=>{
		res.redirect(`/users/${req.params.id}`);
	});
});



//DELETE
router.delete('/:id', (req, res) => {
	req.logout();
	knex('users').del().where('id', req.params.id).then(()=>{
		res.redirect('/venues');
	});
});


module.exports = router