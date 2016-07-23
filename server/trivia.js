//functions to call the HTTP request to get the trivia questions and store the info in a collection -- only needs to be done once as of right now because there are no more trivia questions from this HTTP request they are all located in the collection and if we continue to run this it will duplicate the trivia questions in the database

// Setup cron jobs to pull data from the trivia website repeated every day -- not using this for this API call - it repeats all duplicates but this might be very helpful for the future if we find a better API
// Setup cron jobs
// SyncedCron.options.collectionName = 'cronjobs';

    // SyncedCron.add({
    //     name: 'trivia questions 2',
    //     schedule: function(parser) {
    //         return parser.text('every 1 minute'); // parser is a later.parse object
    //     },
    //     job: function() {
    //         Meteor.call('updateTriviaQuestions');
    //     }
    // });




//this should only be used once to get the data from the API - if we keep this active then it will keep calling it over and over and we will have a ridiculous amount of duplicated entries - i am trying to figure out how to prevent duplicate entries, but until i do so - don't unhighlight this!!!

// getQuestions=function(){
// 	for(var i=1; i < 16; i++){
// 		Meteor.call('updateTriviaQuestions');
// 	}
// }
// Startup
// Meteor.startup(function() {
//     // Start pulling trivia questions from website
//     // getQuestions();
//     console.log('finished getting questions ')
//     SyncedCron.start();
// });



