
Meteor.publish('TriviaQuestionsS', function() {
    return TriviaQuestionsS.find({});
});


Meteor.publish('GameHistory', function() {
    return GameHistory.find({});
}); 

Meteor.publish('users', function() {
	  if (this.userId) {
	    return Meteor.users.find({_id: this.userId});
	  } else {
	    this.ready();
	  }
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'profile': 1, 'emails': 1}});
  } else {
    this.ready();
  }
});


