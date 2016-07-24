import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

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
});

Schema.userSchema = new SimpleSchema({
	emails: {
		type: Array,
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
		type: Schema.profileSchema
	}
});

Accounts.users.attachSchema(Schema.userSchema);