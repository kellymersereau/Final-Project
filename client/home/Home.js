Template.Home.helpers({
	pathForSignIn:function(){
		var path = FlowRouter.path("/sign-in");
		return path
	},
	pathForRegister:function(){
		var path = FlowRouter.path("/register");
		return path
	},
})