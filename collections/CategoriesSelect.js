CategoriesSelect = new Mongo.Collection('CategoriesSelect');

//this says who is allowed to insert into the Categories function and you are allowed to enter the info if this comes up true and this comes up true if userId exists so then the user will be able to submit a Category
CategoriesSelect.allow({
	insert: function(userId, doc){
		return !!userId;
	}
});

CategoriesSelectSchema = new SimpleSchema({
	categories: {
		type: [Boolean],
		optional: true,
		autoform:{
			type: "select-checkbox-inline",
			options: function(){
				return [
					{label: "Fun", value: false},
					{label: "Food", value: false},
					{label: "Shopping", value: false},
					{label: "Site Seeing", value: false},
				]
			}
		},
		label: "Choose categories to start playing!"
	},
	inMap: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden",
		},
		custom: function(){
			if(this.field('categories').value){
				defaultValue = true;
				return defaultValue;
			}
		}
	},
	user: {
		type: String,
		label: "User",
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

CategoriesSelect.attachSchema(CategoriesSelectSchema);