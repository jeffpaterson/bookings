
exports.seed = function(knex, Promise) {
  return knex('venues').del().then(function() { 
    return Promise.join(
      // Deletes ALL existing entries
      

      // Inserts seed entries
      knex('venues').insert({id: 1, name: 'Origin SF', street_address: '1538 Fillmore St', city: 'San Francisco' , zipcode: 94115 , pic1: 'http://www.discotech.me/wp-content/uploads/2015/04/origin_sf1-1500x630.jpg' , pic2: 'http://www.discotech.me/wp-content/uploads/2015/04/origin_sf2.jpg' , clientele: 'Young Professionals, Upscale, Fashion',music: 'EDM, Hip-Hop, Top 40', tableMapPic: 'http://www.discotech.me/wp-content/uploads/2015/04/origin_floorplan-802x1030.png' , description: 'Brought to you by the owners of The Grand in SOMA, Origin is your destination for a high energy nightlife experience. Beautifully designed and uniquely decorated, Origin offers 8,000 square feet of timeless elegance making Origin – The Boutique Nightclub one of the most desirable night spots in San Francisco. Head to the Fillmore District/Western Addition area for music, moderately priced cocktails and lots of dancing in this expansive club that’s all balconies, stages and booming DJ music. A posh lounge with white sofas and big banquettes sets the stage for a spirited outing, and the upstairs bar and seating area is all leather, animal print and lowly lit luxury.' }),
      knex('venues').insert({id: 2, name: 'Harlot Nightclub SF', street_address: '46 Minna St', city: 'San Francisco', zipcode:  94105, pic1: 'http://www.discotech.me/wp-content/uploads/2015/08/harlot_sf1.jpg' , pic2: 'http://www.discotech.me/wp-content/uploads/2015/08/harlot_sf2.jpg' , clientele: 'Corporate, Fashion, Upscale, Young Professionals, Trendy, Financial',music: 'House, EDM, Electronica' , tableMapPic: 'http://www.discotech.me/wp-content/uploads/2015/08/Harlot_Floor-Plan-767x1030.jpg' , description: 'During the 1800s Gold Rush, a large stretch of San Francisco was known as the Barbary Coast – and even better known for the “professional” ladies who worked its streets. Dark and decadent, Harlot is a SoMa club designed to celebrate the most famous of these women, the dolled-up gals who were as sophisticated as they were sexy, and who were followed by lines of pining men.'}),
      knex('venues').insert({id: 3, name: '1015 Folsom', street_address: '1015 Folsom' , city: 'San Francisco' , zipcode: 94103 , pic1: 'http://www.discotech.me/wp-content/uploads/2016/01/1015_folsom1.jpg' , pic2: 'http://www.discotech.me/wp-content/uploads/2016/01/1015_folsom2.jpg' , clientele: 'Young, Trendy',music: 'Hip-Hop, Top 40, EDM, Live Bands' , tableMapPic: 'https://d23jhgw4cciqh2.cloudfront.net/venue/production-manager/f12e.1920x1080.png'  , description:'Deep down inside its heart, 1015 Folsom knows what it is. The swanky interior design, the sprawling interior, the long list of incredible, not-quite-mainstream superstars, the casual dress code, the unpretentiousness…1015 is what dance clubs were before the money, fame, and see-and-be-seen scene became the main reason to go out.' })
    );
  }).then(function() {
    return Promise.join(
      knex('hours').insert({venue_id: 1, dayOfWeek: 6, opening: '22:00:00', closing: '02:00:00'}),
      knex('hours').insert({venue_id: 1, dayOfWeek: 7, opening: '22:00:00', closing: '02:00:00'}),
      knex('hours').insert({venue_id: 2, dayOfWeek: 5, opening: '21:00:00', closing: '02:00:00'}),
      knex('hours').insert({venue_id: 2, dayOfWeek: 6, opening: '21:00:00', closing: '02:00:00'}),
      knex('hours').insert({venue_id: 2, dayOfWeek: 7, opening: '21:00:00', closing: '02:00:00'}),
      knex('hours').insert({venue_id: 3, dayOfWeek: 6, opening: '22:00:00', closing: '03:00:00'}),
      knex('hours').insert({venue_id: 3, dayOfWeek: 7, opening: '22:00:00', closing: '03:00:00'}),
          // Inserts seed entries
      knex('tables').insert({venue_id: 2, name: 'VIP Mezzanine', cost: 900, maxCapacity: 10, description: 'VIP table on the Mezzanine level', status: 'open'}),
      knex('tables').insert({venue_id: 2, name: 'Main Floor', cost: 800, maxCapacity: 10, description: 'Roped off table in the front room.', status: 'open'}),
      knex('tables').insert({venue_id: 2, name: 'Dance Floor', cost: 900, maxCapacity: 15, description: 'Roped off table off of the dance floor.', status: 'open'}),
      knex('tables').insert({venue_id: 1, name: 'G4', cost: 600, maxCapacity: 8, description: 'Round standing table off the dance floor', status: 'open'}),
      knex('tables').insert({venue_id: 1, name: 'G5', cost: 600, maxCapacity: 8, description: 'Round standing table off the dance floor', status: 'open'}),
      knex('tables').insert({venue_id: 1, name: 'G6', cost: 600, maxCapacity: 8, description: 'Round standing table off the dance floor', status: 'open'})
    );
  })
};
