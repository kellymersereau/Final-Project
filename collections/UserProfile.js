UserProfile = new Mongo.Collection('userprofile');

UserProfile.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});

UserBio = new SimpleSchema({
	nickName: {
		type: String,
		optional: true
	},

	firstName: {
	    type: String,
	    optional: true
	},
	lastName: {
	    type: String,
	    optional: true
	},
	birthday: {
	    type: Date,
	    optional: true
	},
	gender: {
	    type: String,
	    allowedValues: ['Male', 'Female'],
	    optional: true
	},
	organization : {
	    type: String,
	    optional: true
	},
	website: {
	    type: String,
	    regEx: SimpleSchema.RegEx.Url,
	    optional: true
	 },
	bio: {
		type: String,
		optional: true
	}
});

UserProfileSchema = new SimpleSchema({
	username: {
		type: String,
		optional: true
	},
	createdAt: {
	    type: Date,
	    label: "Created At",
	    autoValue: function(){
	    	return new Date()
	    },
	    autoform: {
	    	type: "hidden"
	    } 
	},
	
	playerID: {
		type: String,
		label: "Player ID",
		autoValue: function(){
			return this.userId
			},
		autoform: {
			type: "hidden"
		}
	},

	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
	    type: Object,
	    optional: true,
	    blackbox: true
	},
	bio: {
	    type: [UserBio],
	    optional: true
	}
	// ,
	// history: {
	// 	type: Schema.UserHistory,
	// 	optional: true
	// },
	// friends: {
	// 	type: [userId]
	// }
});


//going to use the code below to try and lock POIs for each session.

// Meteor.methods({
// 	placeLock: function(id, currentState){
//  		Recipes.update(id, {
//  			$set: {
//  				inMenu: !currentState
//  			}
//  		});
// 	},
// 	deleteRecipe: function(id){
// 		Recipes.remove(id);
// 	}
// });

UserProfile.attachSchema( UserProfileSchema );















//BELOW IS THE OLD EXTENSION OF THE USER SCHEMA. keep handy in case we need it.



// // UserProfile = new Mongo.Collection('UserProfile');

// //we can extend the user profile with simple schema (in collection2)

// Schema = {};


// Schema.UserProfile = new SimpleSchema({
// 	nickName: {
// 		type: String,
// 		optional: true
// 	},

// 	firstName: {
// 	    type: String,
// 	    optional: true
// 	},
// 	lastName: {
// 	    type: String,
// 	    optional: true
// 	},
// 	birthday: {
// 	    type: Date,
// 	    optional: true
// 	},
// 	gender: {
// 	    type: String,
// 	    allowedValues: ['Male', 'Female'],
// 	    optional: true
// 	},
// 	organization : {
// 	    type: String,
// 	    optional: true
// 	},
// 	website: {
// 	    type: String,
// 	    regEx: SimpleSchema.RegEx.Url,
// 	    optional: true
// 	 },
// 	bio: {
// 		type: String,
// 		optional: true
// 	}
// });

// //not sure if I should make this a subdocument or just its own schema and attach is the user
// // Schema.UserHistory = new SimpleSchema({
// // 	prevQuestions:{
// // 		type: [TriviaQuestions]
// // 	},
// // 	prevLocations: [POI]
// // });

// Schema.User = new SimpleSchema({
// 	username: {
// 		type: String,
// 		optional: true
// 	},
// 	createdAt: {
// 	    type: Date 
// 	},
// 	// Make sure this services field is in your schema if you're using any of the accounts packages
// 	services: {
// 	    type: Object,
// 	    optional: true,
// 	    blackbox: true
// 	},
// 	profile: {
// 	    type: Schema.UserProfile,
// 	    optional: true
// 	}
// 	// ,
// 	// history: {
// 	// 	type: Schema.UserHistory,
// 	// 	optional: true
// 	// },
// 	// friends: {
// 	// 	type: [userId]
// 	// }
// });

// Meteor.users.attachSchema(Schema.User);
