Meteor.methods({

    updateTriviaQuestions: function() {
        // var triviaToken = Meteor.settings.public.triviaToken;

        // Get trivia questions
        HTTP.get('http://www.opentdb.com/api.php?amount=37&token=1edf672b3460fd4d337d3f83dfc7a174ef02e93e0e44554a925d6c05cac2d49a', function(error, response) {
            var questions = [];
            var entries = response.data.results;
            var sort = 0;
            _.each(entries, function(entry) {
                var triviaQuestion = {
                    "Category": entry.category,
                    "Type": entry.type,
                    "Question": entry.question,
                    "CorrectAnswer": entry.correct_answer,
                    "AnswerChoices": entry.incorrect_answers,
                    "NumberOfChoices": entry.incorrect_answers.push(entry.correct_answer)
                };
                // Add question to list
                questions.push(triviaQuestion);
            }, this);

            // Insert new songs into database
            _.each(questions, function(triviaQuestion) {
                TriviaQuestionsS.insert(triviaQuestion);
            }, this);
        });
    },
    createProfile: function(doc){
        check(doc, this.userId);

        var newProfile = {
            _id: doc.userId,
            username: doc.username,
            profile: {
                firstName: doc.firstName,
                lastName: doc.lastName,
                birthday: doc.birthday,
                website: doc.website,
                bio: doc.bio,
            },
        };

        users.insert(newProfile);
    },

});