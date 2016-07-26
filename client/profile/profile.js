Meteor.subscribe('users');
Meteor.subscribe("userData");

Template.Profile.onCreated(function(){
	Session.set('editPage', false);
});

Template.Profile.helpers({
	firstName: function(){
		return Meteor.user().profile.firstName;
	},
	lastName: function(){
		return Meteor.user().profile.lastName;
	},
	username: function(){
		return Meteor.user().profile.username;
	},
	email: function(){
		return Meteor.user().emails[0].address;
	},
	location: function(){
		return Meteor.user().profile.location;
	},
	bio: function(){
		return Meteor.user().profile.bio;
	},
	userClickedEdit: function(){
		return Session.get('editPage', false);
	}
});

Template.Profile.events({
	'click #editPencil': function(){
		$('#profileForm').prop('hidden', true);
		return Session.set('editPage', true);
	},
});


Template.editProfile.helpers({
	firstName: function(){
		return Meteor.user().profile.firstName;
	},
	lastName: function(){
		return Meteor.user().profile.lastName;
	},
	username: function(){
		return Meteor.user().profile.username;
	},
	email: function(){
		return Meteor.user().emails[0].address;
	},
	location: function(){
		return Meteor.user().profile.location;
	},
	bio: function(){
		return Meteor.user().profile.bio;
	},
	userClickedEdit: function(){
		return Session.get('editPage', false);
	}
});


Template.editProfile.events({

	'submit #editProfileForm': function(event){
		event.preventDefault();

		var data = {
			username: event.target.username.value,
			email: event.target.emailNew.value.trim(),
			profile: {
				firstName: event.target.firstName.value.trim(),
				lastName: event.target.lastName.value.trim(),
				location: event.target.location.value,
				bio: event.target.bio.value,
				updatedDate: new Date(),
			},
		};

		console.log(data);
		var id= Meteor.userId();
		console.log(id)

		Meteor.call('update_profile_info', (err, data) => {
			if(!err){
				console.log('no error!');
				$('fieldset').prop('disabled', true);
				return Session.set('editPage', false);
			} else{
				console.log(err);
				$('.alert').addClass('alert-danger');
				$('.alert').text(err.reason);
			}

		});
		
	}
});

// 'click .toggle-checked'() {
//     // Set the checked property to the opposite of its current value
//     Tasks.update(this._id, {
//       $set: { checked: ! this.checked },
//     });
//   },

    // 'update_profile_info'(data) {
    //     Meteor.users.update(this.userId,
    //         {$set: data}
    //     )
    // },