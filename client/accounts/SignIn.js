import { Meteor } from 'meteor/meteor';

// Template.SignIn.onCreated({
// 	Meteor.loggingIn()
// });

Template.SignIn.events({
	'submit #signInForm': function(event){

		event.preventDefault();

		var email = event.target.email.value;
		console.log(email)
		var password = event.target.password.value;

		Meteor.loginWithPassword(email, password, function(err){
			if(!err){
				console.log('no error!');
				Template.instance().checkProfile();
			} 
		});
	}
});

Template.SignIn.helpers({
	checkProfile: function(){
		if(Meteor.user() && Meteor.user().profile.href != "DEFAULT"){
			var currentUser = Meteor.userId();
			var params = {
				id: currentUser,
			};
			var path = FlowRouter.path('/profile/:id', params);
			return path;
		} else {
			FlowRouter.go('/profileform');
		}
	}
});
// render(){
// 	if (Meteor.user() && Meteor.user().profile.href != "DEFAULT") {
// 		FlowRouter.go("/profile/"+ Meteor.user().profile.href);
// 		return;
// 	}