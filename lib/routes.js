import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


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
		BlazeLayout.render('MainLayout', {main: 'Home'});
	}
});



//trivia questions route

FlowRouter.route('/createTrivia', {
	name: 'Trivia',
	action(){
		if(!Meteor.userId()) {
			//will return false if user isn't logged in & automatically sends user home
			FlowRouter.go('home');
		};
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
		if(!Meteor.userId()) {
			//will return false if user isn't logged in & automatically sends user home
			FlowRouter.go('home');
		};
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'map'});
	}
});


//profile route
FlowRouter.route('/profile/:_id', {
	name: 'userProfile',
	action(){
		if(!Meteor.userId()) {
			//will return false if user isn't logged in & automatically sends user home
			FlowRouter.go('home');
		};
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


//leaderboard route

FlowRouter.route('/leaderboard', {
	name: 'leaderboard',
	action(){
		if(!Meteor.userId()) {
			//will return false if user isn't logged in & automatically sends user home
			FlowRouter.go('home');
		};
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'Leaderboard'});
	}
});


