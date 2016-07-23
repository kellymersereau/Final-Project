Meteor.subscribe('users');

Template.SideNav.helpers({
	currentUser: function(){
		return Meteor.userId();
	}
});
