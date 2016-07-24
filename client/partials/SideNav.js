Meteor.subscribe('users');

Template.SideNav.helpers({
	pathToProfile: function(){
		var currentUser = Meteor.userId();
		var params = {
			id: currentUser,
		};
		var path = FlowRouter.path('/profile/:id', params);
		return path;
	},
});
Template.SideNav.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('home');
    }
});