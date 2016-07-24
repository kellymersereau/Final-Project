import { Meteor } from 'meteor/meteor';

GameHistory = new Mongo.Collection('GameHistory');

historySchema = new SimpleSchema({
	datePlayed: {
		type: Date,
		autoValue: function(){
			return new Date()
		},
	},
	playerId: {
		type: String,
		optional: false,
	},
	locationCheckedIn: {
		type: String,
	},
	triviaQuestion: {
		type: String,
	},
	gotAnswerRight: {
		type: Boolean,
	},
});

GameHistory.attachSchema(historySchema);