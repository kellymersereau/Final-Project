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
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('home');
    },
    'click a': function(event){
    	$('div').each(function(){
    		if($(this).hasClass("activestep")){
    			$(this).removeClass("activestep");
    		}
    	});
    	if($(this.parentNode).hasClass("col-md-2")){
    		$(this.parentNode).addClass("activestep");
    	} else{
    		$(this.parentNode).addClass("activestep");
    	}
    }
});

// function resetActive(event) {
//     $("div").each(function () {
//         if ($(this).hasClass("activestep")) {
//             $(this).removeClass("activestep");
//         }
//     });

//     if (event.target.className == "col-md-2") {
//         $(event.target).addClass("activestep");
//     }
//     else {
//         $(event.target.parentNode).addClass("activestep");
//     }
// }