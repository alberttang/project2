
var votes = 0;

/* Vote Tally */
$('.vote-button').click(function () {
    votes++;
    $('.vote-counter').html(votes);
    console.log(votes);
})

// trying to figure out how to remove login form on page load

function populatePoll(question, category, option1) {
    // $( ".test-span" ).append( "<p>Test</p>" );
    // var per = "personal"
    var per = category;
    var personlOptions = $("#" + per);
    var personalInput = $("<input type='radio' name='option'> ");
    var perSpan = $("<span>");
    personalInput.attr("value", option1);
    perSpan.html(option1);
    personlOptions.append(personalInput);
    personalInput.after(perSpan);
    var ques1 = $("." + per + "-question");
    ques1.html(question);

    console.log(option1);
    console.log(category);
    console.log(question);


};


$(document).ready(function () {

    axios.get('/api/poll-category-search/personal')
        .then(function (response) {
            console.log(response.data);
            var parQues = response.data[0].question;
            // var parOpt1 = response.data[0].Answers[0].option;
            // var parOpt2 = response.data[0].Answers[1].option;
            // var parOpt3 = response.data[0].Answers[2].option;
            // //   var parOpt4 =response.data[0].Answers[3].option;
            console.log(response.data[0].Answers.length);
            for ( i = 0; i < response.data[0].Answers.length; i++){
                populatePoll(parQues, "personal", response.data[0].Answers[i].option);                
            }           
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get('/api/poll-category-search/entertainment')
        .then(function (response) {
            console.log(response.data);
            var parQues = response.data[0].question;
            // var parOpt1 = response.data[0].Answers[0].option;
            // var parOpt2 = response.data[0].Answers[1].option;
            // var parOpt3 = response.data[0].Answers[2].option;
            // //   var parOpt4 =response.data[0].Answers[3].option;
            console.log(response.data[0].Answers.length);
            for ( i = 0; i < response.data[0].Answers.length; i++){
                populatePoll(parQues, "entertainment", response.data[0].Answers[i].option);                
            }           
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('/api/poll-category-search/science')
        .then(function (response) {
            console.log(response.data);
            var parQues = response.data[0].question;
            // var parOpt1 = response.data[0].Answers[0].option;
            // var parOpt2 = response.data[0].Answers[1].option;
            // var parOpt3 = response.data[0].Answers[2].option;
            // //   var parOpt4 =response.data[0].Answers[3].option;
            console.log(response.data[0].Answers.length);
            for ( i = 0; i < response.data[0].Answers.length; i++){
                populatePoll(parQues, "science", response.data[0].Answers[i].option);                
            }           
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('/api/poll-category-search/philosophy')
        .then(function (response) {
            console.log(response.data);
            var parQues = response.data[0].question;
            // var parOpt1 = response.data[0].Answers[0].option;
            // var parOpt2 = response.data[0].Answers[1].option;
            // var parOpt3 = response.data[0].Answers[2].option;
            // //   var parOpt4 =response.data[0].Answers[3].option;
            console.log(response.data[0].Answers.length);
            for ( i = 0; i < response.data[0].Answers.length; i++){
                populatePoll(parQues, "philosophy", response.data[0].Answers[i].option);                
            }           
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('/api/poll-category-search/world')
        .then(function (response) {
            console.log(response.data);
            var parQues = response.data[0].question;
            // var parOpt1 = response.data[0].Answers[0].option;
            // var parOpt2 = response.data[0].Answers[1].option;
            // var parOpt3 = response.data[0].Answers[2].option;
            // //   var parOpt4 =response.data[0].Answers[3].option;
            console.log(response.data[0].Answers.length);
            for ( i = 0; i < response.data[0].Answers.length; i++){
                populatePoll(parQues, "world", response.data[0].Answers[i].option);                
            }           
        })
        .catch(function (error) {
            console.log(error);
        });

});

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
    })
})

$(function () {
    $(".create-poll").on("click", function (event) {

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
            window.location.replace('/api/poll/' + sessionStorage.userId);
        } else {
            window.location.replace('/signup/');
        };

    });
});