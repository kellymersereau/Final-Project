Meteor.subscribe('users');
Meteor.subscribe("userData");

Template.Profile.helpers({
	firstName: function(){
		return Meteor.user().profile.firstName;
	},
	lastName: function(){
		return Meteor.user().profile.lastName;
	},
	username: function(){
		return Meteor.user().profile.username;
	},
	email: function(){
		return Meteor.user().emails[0].address;
	},
	location: function(){
		return Meteor.user().profile.location;
	},
	bio: function(){
		return Meteor.user().profile.bio;
	},
});
