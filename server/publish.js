
Meteor.publish('TriviaQuestions', function() {
    return TriviaQuestions.find();
});
Meteor.publish('users', function() {
    return users.find();
});
Meteor.publish('userprofile', function() {
    return userprofile.find();
});

// Meteor.publish("userData", function () {
//   if (this.userId) {
//     return Meteor.users.find({_id: this.userId});
//   } else {
//     this.ready();
//   }
// });

// Meteor.publish('users', function(){
// 	//check to make sure the value that comes in is a string
// 	// check(id, String);
// 	//makes it so we are only getting back the info for the current user and not all users
// 	return userData.find({});
// });

