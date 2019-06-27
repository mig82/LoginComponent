define(function(){

	var view;

	const dummy = {
		user: "miguel@kony.com",
		password: "1234"
	};

	function login(user, password){
		/* Replace this made-up logic with your own.
		Ideally you want to call a service with these credentials.*/
		if(user === dummy.user && password === dummy.password){
			view.Login.setMessage("Success!");
		}
		else{
			view.Login.setMessage(`Login failed.`);
			alert(`Try user ${dummy.user} and password ${dummy.password}`);
		}
	}

	function onInvalidInputs(){
		//TODO: Call service to show captcha, lock account, set the dogs loose, etc.
	}

	return {

		preShow: function(){
			view = this.view;	
		},

		postShow: function(){
			/*global amplify*/
			amplify.subscribe("Login.valid", login);
			amplify.subscribe("Login.invalidUser", onInvalidInputs);
			amplify.subscribe("Login.invalidPassword", onInvalidInputs);
		},

		onNavigate: function(){
			kony.mvc.patch(this);
		}
	};
});