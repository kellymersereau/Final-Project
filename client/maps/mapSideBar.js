var siderbarPlaces = Session.get('sessionPlaces');


Template.mapSideNav.helpers({
	renderedName0: ()=> {
		return Session.get('sessionNames0');
	}, 
	renderedName1: ()=> {
		return Session.getJSON('sessionNames1');
	}, 
	renderedVicinity0: ()=> {
		return Session.get('sessionVicinity0');
	},
	renderedVicinity1: ()=> {
		return Session.get('sessionVicinity1');
	},
});

// google places image example API call:
// https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY
var photoArray = [];

for (i=0; i<photoLoc[i]; i++){
	HTTP.get("https://maps.googleapis.com/maps/api/streetview?size=200x200&location="
		+ photoLoc[i].lat + "," + photoLoc[i].lng + "&key=AIzaSyBjCsLiR6z8Xgg1LNELZNBpESGylRFt1CE", function(error, response){
			photoArray.push(response);
		});
	};
	


// Template.Profile.helpers({
// 	firstName: function(){
// 		return Meteor.user().profile.firstName;
// 	},
// 	lastName: function(){
// 		return Meteor.user().profile.lastName;
// 	},
// 	username: function(){
// 		return Meteor.user().profile.username;
// 	},
// 	email: function(){
// 		return Meteor.user().emails[0].address;
// 	},
// 	location: function(){
// 		return Meteor.user().profile.location;
// 	},
// 	bio: function(){
// 		return Meteor.user().profile.bio;
// 	},
// });

// Template.mapSideNav.helpers({
// 	renderedPlaces: ()=> {
// 		return Session.get('allSessionRenders');
// 	}, 
// 	renderedPlaces1: ()=> {
// 		return [Session.get('sessionRendered0')];
// 	}, 
// 	renderedPlaces2: ()=> {
// 		return [Session.get('sessionRendered1')];
// 	},
// 	allrenders: ()=>{
// 		var place1 = Session.get('sessionRendered0');
// 		var place2 = Session.get('sessionRendered1');
// 		return [place1, place2];
// 	} 
// });

// Template.mapSideNav.helpers({
// 	pathToProfile: function(){
// 		var currentUser = Meteor.userId();
// 		var params = {
// 			id: currentUser,
// 		};
// 		var path = FlowRouter.path('/profile/:id', params);
// 		return path;
// 	},
// });
// Template.mapSideNav.events({
//     'click .logout': function(event){
//         event.preventDefault();
//         Meteor.logout();
//         FlowRouter.go('home');
//     }
// });