import { Meteor } from 'meteor/meteor';

GameHistory = new Mongo.Collection('GameHistory');


GameHistory.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update() {return false},
	remove() {return false},
});

TriviaQuestionsS.deny({
	insert() {return false},
	update() {return true},
	remove() {return true},
});

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
		optional: true,
	},
	triviaQuestion: {
		type: String,
	},
	gotAnswerRight: {
		type: Boolean,
	},
});

GameHistory.attachSchema(historySchema);