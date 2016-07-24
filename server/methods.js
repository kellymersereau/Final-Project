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
    updateUserScore(score){
        Meteor.users.update(this.userId,
            {$set: {'profile.score': score} }
        )
    },
    'set_profile_href'(href) {
        if (!href) {
            href = this.userId;
        }
        Meteor.users.update(this.userId,
            {$set: {'profile.href': href}}
        )
    },
    'update_profile_image'(url) {
        Meteor.users.update(this.userId,
            {$set: {'profile.image': url}}
        )
    },
    'update_profile_info'(data) {
        Meteor.users.update(this.userId,
            {$set: data}
        )
    },


});