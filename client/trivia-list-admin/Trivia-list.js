// Meteor.subscribe('TriviaQuestions');

Template.Trivia.onCreated(function(){
	//setup autorun
	var self = this;
	//unsubscribe from old subscriptions so when we go to the next question we aren't still subscribed to the previous one
	self.autorun(function(){
		self.subscribe('TriviaQuestions');
	});
});

Template.Trivia.helpers({
	questions: ()=> {
		return TriviaQuestions.find({});
	},
});

