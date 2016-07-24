
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

// if (Meteor.isServer) {
// 	Meteor.publish('viewUser', function(domain) {
// 		return Meteor.users.find({ "profile.href": domain }, { fields: { services: 0 } })
// 	})

// 	Meteor.publish('viewFriends', function() {
// 		let user = Meteor.users.findOne(this.userId);
// 		let friendIds = user.profile.friends.map((friend) => {
// 			return friend.id;
// 		})
// 		return Meteor.users.find({ _id: { $in: friendIds} })
// 	})
// }

