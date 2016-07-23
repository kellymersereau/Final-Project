// Meteor.subscribe('TriviaQuestionsS');

Template.trivia.onCreated(function(){
	Session.set('showQuestion', false);
	//setup autorun
	var self = this;
	//unsubscribe from old subscriptions so when we go to the next question we aren't still subscribed to the previous one
	self.autorun(function(){
		self.subscribe('TriviaQuestionsS');
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
		return Session.set('showQuestion', true);
	}
});

Template.triviaQuestionsShow.helpers({
	questions: ()=> {
		return TriviaQuestionsS.findOne({});
	},
});

