import { Meteor } from 'meteor/meteor';

TriviaQuestionsS = new Mongo.Collection('TriviaQuestionsS');

//this says who is allowed to insert into the Trivia function and you are allowed to enter the info if this comes up true and this comes up true if userId exists so then the user will be able to submit a Category
TriviaQuestionsS.allow({
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
})

TriviaSchema = new SimpleSchema({
	Category: {
		type: String,
		label: "Category"
	},
	Type: {
		type: [String],
		autoform: {
			type: "select-radio-inline",
			options: function(){
				return [
					{ label: "True/False", value: "True/False"},
					{ label: "Multiple Choice", value: "Multiple Choice"},
				]
			}
		},
		label: "Type of Question",
	},
	Question: {
		type: String,
		label: "Question"
	},
	CorrectAnswer: {
		type: String,
		label: "Correct Answer"
	},
	AnswerChoices: {
		type: [String],
		label: "Answer Choices (including correct answer)"
	},
	NumberOfChoices: {
		type: Number,
		autoValue: function(){
			if(Meteor.isClient){
				var answer = autoform.getFieldValue('createNewTriviaForm', 'Type');
				if(answer === "True/False"){
					return {
						autoValue: 2,
					};
				}else {
					return{
						autoValue: 4,
					};
				}
			}
		},
		autoform: {
			type: "hidden",
		},
		label: "Number of answer choices for question"
	},

	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type: "hidden"
			//because this value is auto generated based on the user thats logged in we want to hide this value on the autoform so it cannot be filled in
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date()
		},
		autoform: {
			type: "hidden"
			//because this value is auto generated based on the user thats logged in we want to hide this value on the autoform so it cannot be filled in
		}
	},
});

TriviaQuestionsS.attachSchema(TriviaSchema);