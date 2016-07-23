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


FlowRouter.route('/categoriesInput', {
	name: 'CategoriesInput',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();
		//now we are rendering the CategoriesInput template into the sub template we created on the MainLayout page and we gave it a name of 'main'.  to do this we do the BlazeLayout and we first render in 'MainLayout' then we put an object which contains a KEY of the name we gave the subtemplate in the MainLayout and then a STRING of the name of the Categories template we defined in the HomeLayout

		BlazeLayout.render('MainLayout', {main: 'CategoriesInput'});
	}
});

//categories select route

FlowRouter.route('/categoriesSelect', {
	name: 'CategoriesSelect',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'CategoriesSelect'});
	}
});

//trivia questions route

FlowRouter.route('/trivia', {
	name: 'Trivia',
	action(){
		//pageview counter for google analytics
		GAnalytics.pageview();
		//use BlazeLayout to render the Categories Select layout
		BlazeLayout.render('MainLayout', {main: 'Trivia'});
	}
});

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


