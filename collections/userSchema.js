import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


Meteor.users.allow({
     // NOTE: The client should not be allowed to add users directly!
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        console.log("doc: " + doc + " userId: " + userId);
        return !! userId;
    },
    
    update: function(userId, doc, fieldNames) {
        // only allow updating if you are logged in
        console.log("doc: " + doc + " userId: " + userId);
        // NOTE: a user can only update his own user doc and only the 'userProfile' field
        return !! userId && userId === doc._id && _.isEmpty(_.difference(fieldNames, ['userProfile'])); 
    },
     // NOTE: The client should not generally be able to remove users
    remove: function(userID, doc) {
        //only allow deleting if you are owner
        return doc.submittedById === Meteor.userId();
    }
    
});

Schema = {};

Schema.profileSchema = new SimpleSchema({
	firstName: {
		type: String,
		max: 16
	},
	lastName: {
		type: String,
		max: 16,
	},
	location: {
		type: String,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	score: {
		type: Number,
		optional: true,
	},
	href: {
		type: String,
	}
});

Schema.userSchema = new SimpleSchema({
	username: {
		type: String,
		optional: true,
	},
	emails: {
		type: Array,
		optional: true,
	},
	 "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
	createdAt: {
		type: Date,
		autoValue: function(){
			return new Date()
		}
	},
	profile: {
		type: Schema.profileSchema,
		optional: true,
	}
});

Accounts.users.attachSchema(Schema.userSchema);