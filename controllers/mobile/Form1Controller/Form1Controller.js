define(function(){

	function login(user, password){
		//Implement your login logic here. Ideally you want to call a service with these credentials.
		alert(`User: ${user}\nPassword: ${password}`);
	}

	var invalidLoginCount = 0;
	function countLoginAttempt(){
		invalidLoginCount++;
		if (countLoginAttempt >= 5){
			//TODO: Call service to show captcha, lock account, set the dogs loose, etc.
			kony.print(`Ivalid tries: ${invalidLoginCount}`);
		}
	}

	return {
		postShow: function(){
			/*global amplify*/
			amplify.subscribe("Login.valid", login);
			amplify.subscribe("Login.invalidUser", countLoginAttempt);
			amplify.subscribe("Login.invalidPassword", countLoginAttempt);
		},
		onNavigate: function(){
			kony.mvc.patch(this);
		}
	};
});