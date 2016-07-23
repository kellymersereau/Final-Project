
Meteor.publish('TriviaQuestionsS', function() {
    return TriviaQuestionsS.find({});
});
Meteor.publish('users', function() {
	  if (this.userId) {
	    return Meteor.users.find({_id: this.userId});
	  } else {
	    this.ready();
	  }
});
// Meteor.publish('userprofile', function() {
//     return userprofile.find();
// });

// Meteor.publish("userData", function () {
//   if (this.userId) {
//     return Meteor.users.find({_id: this.userId});
//   } else {
//     this.ready();
//   }
// });



