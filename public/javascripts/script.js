$(function() {
	

	//CHANGES # OF SEATS WHILE CHANGING
	$('#seatsWanted').on('change', e=>{
		$('#seatsWantedView').text('Seats: ' + e.target.value)
	})
	
	//CHANGES REQUIRED PLEDGE WHILE CHANGING NUMBER OF SEATS
	$('#seatsWanted').on('change', e=>{
		$('#pledge').text('Your Pledge: ' + (+e.target.value * parseInt($('#pledgePerSeat').text().match(/\d+/)[0], 10)
	))})

	$('#seatsWanted').on('change', e=>{
		$('#pledgeInput').val((+e.target.value * parseInt($('#pledgePerSeat').text().match(/\d+/)[0], 10)
	))})

	$('#noJoin').on('click', e=>{
		e.preventDefault();
		// alert('Sorry, this table is full.')
		var tableFull = '<div id="tableFull"><p>Sorry, this table is full</p></div>'

		$('#joinTable').append(tableFull);
		setTimeout(()=>{
			$('#tableFull').remove();
		}, 5000)

	})
});