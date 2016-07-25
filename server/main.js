import { Meteor } from 'meteor/meteor';

// // Ensuring every user has an email address, should be in server-side code
// Accounts.validateNewUser((user) => {
//   new SimpleSchema({
//     _id: { type: String },
//     emails: { type: Array },
//     'emails.$': { type: Object },
//     'emails.$.address': { type: String },
//     'emails.$.verified': { type: Boolean },
//     createdAt: { type: Date },
//     services: { type: Object, blackbox: true }
//   }).validate(user);

//   // Return true to allow user creation to proceed
//   return true;
// });

// Validate username, without a specific error message.
// Accounts.validateNewUser(function (user) {
//   return user.username !== "root";
// });
// // Validate emails, without a specific error message.
// Accounts.validateNewUser(function (user) {
//   return user.emails !== "root";
// });
// // Validate password, without a specific error message.
// Accounts.validateNewUser(function (user) {
//   return user.password !== "root";
// });

// // Validate username, sending a specific error message on failure.
// Accounts.validateNewUser(function (user) {
//   if (user.username && user.username.length >= 3)
//     return true;
//   throw new Meteor.Error(403, "Username must have at least 3 characters");
// });