import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// this trigger makes it so the user is logged out they will automatically be redirected to home instead of being able to see the page they were previously on
FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
		//if meteor.userid returns false send the user home
		FlowRouter.go('home');
	};
}]);


//home route
FlowRouter.route('/', {
	name: 'home',
	action(){
		//add a trigger on the route / inside action()
		if(Meteor.userId()) {
			//will return true if user is logged in & automatically sends user to the map if logged in is true & if it's false it routes the user to the homepage
			FlowRouter.go('map');
		};
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the HomeLayout we created before
		BlazeLayout.render('HomeLayout');
	}
});



//trivia questions route

FlowRouter.route('/createTrivia', {
	name: 'Trivia',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'Trivia'});
	}
});


//map route
FlowRouter.route('/map', {
	name: 'map',
	action(){
		//pageview counter for google analytics
		// GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'map'});
	}
});


//profile route
FlowRouter.route('/profile/:_id', {
	name: 'userProfile',
	action(){
		//pageview counter for google analytics
		// GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'Profile'});
	}
});

// sign in route
FlowRouter.route('/sign-in', {
	name: 'sign-in',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();

		BlazeLayout.render('MainLayout', {main: 'SignIn'});
	}
});

// sign in route
FlowRouter.route('/register', {
	name: 'register',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();

		BlazeLayout.render('MainLayout', {main: 'Register'});
	}
});


// //trivia questions route

// FlowRouter.route('/trivia', {
// 	name: 'Trivia',
// 	action(){
// 		//pageview counter for google analytics
// 		GAnalytics.pageview();
// 		//use BlazeLayout to render the Categories Select layout
// 		BlazeLayout.render('MainLayout', {main: 'Trivia'});
// 	}
// });

//leaderboard route

FlowRouter.route('/leaderboard', {
	name: 'leaderboard',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'Leaderboard'});
	}
});


