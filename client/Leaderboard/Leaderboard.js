import { Mongo } from 'meteor/mongo';

Meteor.subscribe('users');
Meteor.subscribe('History');
Meteor.subscribe('userprofile');

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
		return Meteor.userId();
	},
	score:()=>{
		return Meteor.userprofile.find({score: 1})
	}
});
