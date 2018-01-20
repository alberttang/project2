
var votes = 0;

/* Vote Tally */
$('.vote-button').click(function() {
    votes++;
    $('.vote-counter').html(votes);
    console.log(votes);
})

/* Create Poll */
$('.create-poll').on('click', function() {
    
})
