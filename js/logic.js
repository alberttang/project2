
var votes = 0;

/* Vote Tally */
$('.vote-button').one('click', function() {
    votes++;
    $('.vote-counter').html(votes);
    console.log(votes);
})

/* Create Poll, Check if User is Logged In */
$('.create-poll').one('click', function() {
    verifyJwt();
    if (err) {
        throw (err);
        alert("Please log in");
    } else {
        alert("Sweet!");
    }
})




