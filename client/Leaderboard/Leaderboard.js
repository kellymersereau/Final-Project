import { Mongo } from 'meteor/mongo';

Meteor.subscribe('users');
Meteor.subscribe('History');
Meteor.subscribe("userData");

Template.leaderboard.helpers({
	leaderboard: ()=> {
		return Meteor.users.find({})
	},
	rank:() => {
		var i = 0;
		i += 1;
		return i;
	},
	username:() => {
		return Meteor.user().profile.username;
	},
	score:()=>{
		return Meteor.user().profile.score;
	}
});
