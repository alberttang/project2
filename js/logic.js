
var votes = 0;

/* Vote Tally */
$('.vote-button').one('click', function() {
    votes++;
    $('.vote-counter').html(votes);
    console.log(votes);
})

/* Create Poll */
$('.create-poll').one('click', function() {
    
})


