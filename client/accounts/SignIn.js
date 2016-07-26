import { Meteor } from 'meteor/meteor';


Template.SignIn.events({
	'submit #signInForm': function(event){

		event.preventDefault();

		var email = event.target.email.value;
		var password = event.target.password.value;

		Meteor.loginWithPassword(email, password, function(err){
			if(!err){
				console.log('no error!');
				var currentUser = Meteor.userId();
				var params = {
					id: currentUser,
				};
				FlowRouter.go('/profile/:id', params);
				
			} else {
				console.log(err)
				$('.alert').addClass('alert-danger');
				$('.alert').text(err.reason);
			}
		});
	}
});

