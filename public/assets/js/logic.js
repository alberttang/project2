
var votes = 0;

/* Vote Tally */
$('.vote-button').click(function () {
    votes++;
    $('.vote-counter').html(votes);
    console.log(votes);
});

///////////////////////////////////////////////////////////////////////
//FUNCTION FOR LOGIN//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
$(function () {
    $(".login").on("click", function (event) {
        event.preventDefault();
        if (document.getElementById('loginBtn').innerHTML === 'Sign out') {
            return
        }
        var username = document.getElementById('username').value
        var password = document.getElementById('password').value
        console.log(username)
        console.log(password)
        //TODO: create a post request. save the resulting token in session storage.
        $.post("/api/auth/login", { userName: username, password: password }, function (data, status) {
            console.log(status)
            console.log(data)
            if (status === "success") {
                sessionStorage.userId = data.userId
                sessionStorage.jwt = data.token
                sessionStorage.userName = data.userName
                document.getElementById('username').remove()
                document.getElementById('password').remove()
                document.getElementById('signup-button').remove()
                document.getElementById('my-polls_top').style.display = 'block';
                document.getElementById('loginBtn').innerHTML = 'Sign out ' + sessionStorage.userName
                document.getElementById('loginBtn').onClick = function (event) {
                    sessionStorage.clear()
                    location.reload()
                }
            }

        });
    });
});



//////////////////////////////////////////////////////////////////////////
//FUNCTION TO CREATE A POLL AND POST TO SQL////////
/////////////////////////////////////////////////////////////////////////
$(function () {
    $(".create-newpoll").on("click", function (event) {

        var radioValue = $("input[name='option']:checked").val();
        if (!radioValue) {
            alert("Please Select a Category");
        } else {
            console.log(radioValue);
            var pollQuestion = $('input[name="new_poll-question"]').val().trim();
            var pollOption1 = $('input[name="create_poll-answer-1"]').val().trim();
            var pollOption2 = $('input[name="create_poll-answer-2"]').val().trim();
            var pollOption3 = $('input[name="create_poll-answer-3"]').val().trim();
            var pollOption4 = $('input[name="create_poll-answer-4"]').val().trim();


            var newPoll = {
                "UserId": sessionStorage.userId,
                "question": pollQuestion,
                "category": radioValue,
                "answers": [
                    {
                        "option": pollOption1,
                        "num": 1

                    },
                    {
                        "option": pollOption2,
                        "num": 2
                    }

                ]
            };

            if (pollOption3 !== "") {
                var option3 = {
                    "option": pollOption3,
                    "num": 3
                }

                newPoll.answers.push(option3);
            };

            if (pollOption4 !== "") {
                var option4 = {
                    "option": pollOption4,
                    "num": 4
                }

                newPoll.answers.push(option4);
            };



            // Validate if at least 2 options have been added
            if ((pollOption1 && (pollOption2 || pollOption3 || pollOption4) === "") || (pollOption2 && (pollOption1 || pollOption3 || pollOption4) === "") || (pollOption3 && (pollOption1 || pollOption3 || pollOption4) === "") || (pollOption4 && (pollOption1 || pollOption3 || pollOption4) === "")) {
                alert('at least two text inputs are filled');
                return false;
            } else {

                console.log(newPoll);
                // window.location.replace('/');

                axios.post('/api/poll', newPoll, { headers: { Authorization: sessionStorage.jwt } })
                    .then(function (response) {
                        var pollID = response.data[0].PollId;
                        console.log("The Poll ID is : " + pollID);
                        console.log(response);
                        window.location.replace('/api/poll/' + pollID);


                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

        }
    });
});

function hideStuff() {
    var radioButton = $(".radio-button");
    radioButton.hide();
    var progressBar = $(".progress");
    progressBar.show();
    $(".vote-button").hide();
}

function showProgress(result,width){
    var result1 = $("."+result);
    var widthPer = "width:"+width+"%";
    result1.attr("style",widthPer);
    
}

    

//////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO POST VOTE TO RESPONSES TABLE /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
$(function () {
    $(".vote-button").on("click", function (event) {
        hideStuff();
        var radioValue = $("input[name='option']:checked").val();
        if (!radioValue) {
            alert("Please Select an Answer");
        } else {
            console.log(radioValue);
            var pollId = $("input[name='option']:checked").attr("pollId");
            var ansID = $("input[name='option']:checked").attr("optid");
            var userID = $("input[name='option']:checked").attr("pollId");
            var newResponse = {
                "answerId": ansID,
                "PollId": pollId,
                "UserId": sessionStorage.userId
            };
            console.log(newResponse);

            axios.post('/api/response', newResponse, { headers: { Authorization: sessionStorage.jwt } })
                    .then(function (response) {
                        // var pollID = response.data[0].PollId;
                        // console.log("The Poll ID is : " + pollID);
                        console.log(response);
                        // window.location.replace('/api/poll/' + pollID);
                        axios.get('/api/response-count/'+response.data.PollId)
                                .then(function (response) {
                                    console.log(response);
                                    console.log(response.data[0]['COUNT(*)']);
                             var options = [];
                                    
                            for ( i = 0; i < response.data.length; i++){
                                options[i] = response.data[i]['COUNT(*)']
                            }
                            console.log(options);
                            var opTotal = 0
                            for ( i=0; i < options.length; i++){
                                opTotal += options[i]
                            }
                            console.log(opTotal);

                            var num1 = Math.round(((options[0]/opTotal) * 100)); 
                            showProgress("result1",num1);                            
                            var num2 = Math.round(((options[1]/opTotal)* 100));
                            showProgress("result2",num2);                            
                            var num3 = "";
                            var num4 = "";
                            if(typeof options[2] != "undefined"){
                                  num3 = Math.round(((options[2]/opTotal)* 100)); 
                                  showProgress("result3",num3);
                                  
                            }
                            if(typeof options[3] != "undefined"){
                                 num4 = Math.round(((options[3]/opTotal)* 100));
                                 showProgress("result4",num4);
                                 
                            }

                            console.log(num1,num2,num3,num4);


                                });

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

        });
    });




//////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION TO CHECK IF USER IS SIGNED IN BEFORE VIEWING MY POLLS
/////////////////////////////////////////////////////////////////////////////////////////////////
$(function () {
    $(".my-polls").on("click", function (event) {

        if (sessionStorage.userId) {
            window.location.replace('/api/mypoll/' + sessionStorage.userId);
        } else {
            alert("Please login or Sign-up");
        };

    });
});


$(function () {
    $(".create-poll").on("click", function (event) {

        if (sessionStorage.userId) {
            window.location.replace("/create-poll");
        } else {
            window.location.replace('/signup/');
        };

    });
});
////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION FOR DISPLAYING THE RESULTS////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

