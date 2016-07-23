CategoriesInput = new Mongo.Collection('CategoriesInput');

//this says who is allowed to insert into the Categories function and you are allowed to enter the info if this comes up true and this comes up true if userId exists so then the user will be able to submit a Category
CategoriesInput.allow({
	insert: function(userId, doc){
		return !!userId;
	}
});

Keywords = new SimpleSchema({
	name: {
		type: String,
		label: "New Keyword",
	},
});

CategoriesInputSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Category Title"
	},
	subcategoryKeywords: {
		type: [Keywords],
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

CategoriesInput.attachSchema(CategoriesInputSchema);