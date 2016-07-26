import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Template.Register.events({
	'submit #registerForm': function(event){

		event.preventDefault();

		Accounts.createUser({
			email: event.target.email.value.trim(),
			password: event.target.password.value,
			createdAt: new Date(),
			profile:{
				firstName: event.target.firstName.value.trim(),
				lastName: event.target.lastName.value.trim(),
				username: event.target.username.value,
				location: event.target.location.value,
				bio: event.target.bio.value,
				href: 'DEFAULT',
			}
		}, function(err) {
			if(!err) {
				Meteor.call('set_profile_href', (err, data) => {
					if(err) console.log(err);
					var currentUserHref = Meteor.user().profile.href;
					var params = {
						id: currentUserHref,
					};
					FlowRouter.go('/profile/:id', params);
				})
			} else { 
				console.log(err)
				$('.alert').addClass('alert-danger');
				$('.alert').text(err.reason);
			}
		})
	}
});


