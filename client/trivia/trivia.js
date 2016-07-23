// Meteor.subscribe('TriviaQuestions');

Template.triviaQuestionsShow.onCreated(function(){
	//setup autorun
	var self = this;
	//unsubscribe from old subscriptions so when we go to the next question we aren't still subscribed to the previous one
	self.autorun(function(){
		self.subscribe('TriviaQuestions');
	});
});

Template.triviaQuestionsShow.helpers({
	questions: ()=> {
		return TriviaQuestions.findOne({});
	},
	// 'click #'
});

// if(event.target.value == {{}})
