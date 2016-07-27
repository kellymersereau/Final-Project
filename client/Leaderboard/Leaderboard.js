import { Mongo } from 'meteor/mongo';

Meteor.subscribe('users');
Meteor.subscribe('GameHistory');
Meteor.subscribe("userData");

Template.leaderboard.helpers({
	leaderboard: ()=> {
		return Meteor.users.find({}, {sort: {'profile.score': -1}});
	},
	rank:() => {
		for(var i=1; i < 100; i++){
			return i;
		}
	},
	
});
