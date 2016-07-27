// Meteor.subscribe('TriviaQuestionsS');
// Meteor.subscribe('GameHistory');

var randomQuestion = {};

Template.trivia.onCreated(function(){
	Session.set('showQuestion', false);
	//setup autorun
	var self = this;
	//unsubscribe from old subscriptions so when we go to the next question we aren't still subscribed to the previous one
	self.autorun(function(){
		self.subscribe('TriviaQuestionsS');
		self.subscribe('GameHistory');
		self.subscribe('users');
	});
});

Template.trivia.helpers({
	questions: ()=> {
		return TriviaQuestionsS.findOne({});
	},
	userPressedButton: function(){
		return Session.get('showQuestion',false);
	}
});


Template.trivia.events({
	'click #getTriviaButton': function(){
		console.log('button clicked')
		return Session.set('showQuestion', true);
	}
});

Template.triviaQuestionsShow.helpers({
	questions: function() {
		// grabbing all of the trivia questions
		var trivia = TriviaQuestionsS.find({}, {sort: {_id: -1}});

		//blank array to push trivia questions into
		var questionArray = [];

		//pushing each of the objects returned into the question array
		trivia.map(function(result){
			questionArray.push(result);
		});
		
		//getting the random number to be used as the index for the random question
		var arrayNum = Math.floor(questionArray.length * Math.random());
		console.log(arrayNum);

		//makes the random question using the question array and the newly createed random index
		randomQuestion = questionArray[arrayNum];
		console.log(randomQuestion);

		//returns the random question object!
		return randomQuestion;
	},
});

Template.triviaQuestionsShow.events({
	'click .btn-text': function(event){
		event.preventDefault();

		var answerPicked = event.target.value;
		console.log(answerPicked);

		var correctAnswer = randomQuestion.CorrectAnswer;
		console.log(correctAnswer);

		if(answerPicked == correctAnswer){
			console.log('CORRECT');

			//insert record into History

			var historyUpdate = {
				playerId: Meteor.userId(),
				triviaQuestion: randomQuestion.Question,
				gotAnswerRight: true,
			};

			console.log(historyUpdate);

			GameHistory.insert(historyUpdate);

			//update score under user profile

			var currentScore = Meteor.user().profile.score;
			if(currentScore == null){
				currentScore = 0;
			};
			var newScore = currentScore + 50;

			Meteor.users.update(Meteor.userId(),
				{$set: {'profile.score': newScore}}
			);


			$('#correctAlert').prop('hidden', false);
			return Session.set('showQuestion', false);
		} else {
			console.log('WRONG');

			//insert record into History
			var historyUpdate = {
				playerId: Meteor.userId(),
				triviaQuestion: randomQuestion.Question,
				gotAnswerRight: false,
			};

			console.log(historyUpdate);

			GameHistory.insert(historyUpdate);

			//update score under user profile

			var currentScore = Meteor.user().profile.score;
			if(currentScore == null){
				currentScore = 0;
			};
			var newScore = currentScore - 10;

			Meteor.users.update(Meteor.userId(),
				{$set: {'profile.score': newScore}}
			);

			$('#wrongAlert').prop('hidden', false);
			return Session.set('showQuestion', false);
		}

		
	}
});
