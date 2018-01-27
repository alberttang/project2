
/////////////////////////////////////////////////////////////////////////////////////////////
//FUNCTION TO POPULATE POLLS ON THE INDEX PAGE//////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
function populatePoll(question, category, option1, pID, oID) {
    // $( ".test-span" ).append( "<p>Test</p>" );
    // var per = "personal"
    var per = category;
    var personlOptions = $("#" + per);    
    var personalInput = $("<input type='radio' name='option'> ");
    var perSpan = $("<span>");
    personalInput.attr("value", option1);
    var pollId = pID;
    var optid = oID;
    personalInput.attr("pollId", pID);
    personalInput.attr("optid", oID);
    perSpan.html(option1);
    // personlOptions.append(personalInput);
    // personalInput.after(perSpan);
    var ques1 = $("." + per + "-question");
    ques1.html(`<a href="/api/poll/${pID}">${question}<a>`);
    ques1.attr("pollId",pID);
    console.log(option1);
    console.log(category);
    console.log(question);


};

/////////////////////////////////////////////////////////////////////////////////////////
// Function to Get Polls for each Category /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

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
            for (i = 0; i < response.data[0].Answers.length; i++) {
                populatePoll(parQues, "personal", response.data[0].Answers[i].option, response.data[0].Answers[i].PollId, response.data[0].Answers[i].id);
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
            for (i = 0; i < response.data[0].Answers.length; i++) {
                populatePoll(parQues, "entertainment", response.data[0].Answers[i].option, response.data[0].Answers[i].PollId, response.data[0].Answers[i].id);
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
            for (i = 0; i < response.data[0].Answers.length; i++) {
                populatePoll(parQues, "science", response.data[0].Answers[i].option, response.data[0].Answers[i].PollId, response.data[0].Answers[i].id);
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
            for (i = 0; i < response.data[0].Answers.length; i++) {
                populatePoll(parQues, "philosophy", response.data[0].Answers[i].option, response.data[0].Answers[i].PollId, response.data[0].Answers[i].id);
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
            for (i = 0; i < response.data[0].Answers.length; i++) {
                populatePoll(parQues, "world", response.data[0].Answers[i].option, response.data[0].Answers[i].PollId, response.data[0].Answers[i].id);
            }
        })
        .catch(function (error) {
            console.log(error);
        });

});
