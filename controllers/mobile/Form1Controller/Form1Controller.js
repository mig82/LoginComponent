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
			view.Login.showMessage("Success!");
		}
		else{
			view.Login.showMessage(`Login failed.`);
			alert(`Try user ${dummy.user} and password ${dummy.password}`);
		}
	}

	function onValidInputs(){
		//TODO: Logic on syntactically valid inputs.
		kony.print("TODO: Logic on syntactically valid inputs.");
	}

	function onInvalidInputs(){
		//TODO: Logic on syntactically invalid inputs, like captchas, block account, etc.
		kony.print("TODO: Logic on syntactically invalid inputs, like captchas, block account, etc.");
	}

	return {

		preShow: function(){
			view = this.view;

			//amplify.publish("Form1.preShow");
			this.view.Login.preShow();
		},

		postShow: function(){
			this.view.Login.onLogin = login;
			/*global amplify*/
			amplify.subscribe("Login.onLogin", login);
			amplify.subscribe("Login.valid", onValidInputs);
			amplify.subscribe("Login.invalidUser", onInvalidInputs);
			amplify.subscribe("Login.invalidPassword", onInvalidInputs);

			//amplify.publish("Form1.postShow");
			this.view.Login.postShow();
		},

		onNavigate: function(){
			//kony.mvc.patch(this, true);
			kony.mvc.patch(this);
		}
	};
});