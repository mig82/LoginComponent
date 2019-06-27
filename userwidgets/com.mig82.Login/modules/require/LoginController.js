define(function() {

	//TODO: Expose fields or function to allow the developer to set the password regex.
	const userRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /^([a-zA-Z0-9@!#+%&$]{2,})$/;

	return {
		togglePasswordVisibility: function _togglePasswordVisibility(/*widget, x, y*/){
			//alert(`w: ${widget.id}\nx: ${x}\ny: ${y}`);

			//l=eye icon -> show
			if(this.view.showPasswordButton.text === 'l'){
				this.view.showPasswordButton.text = 'm';
				this.view.passwordTextBox.secureTextEntry = false;
			}
			//m=cancelled eye icon -> hide
			else{
				this.view.showPasswordButton.text = 'l';
				this.view.passwordTextBox.secureTextEntry = true;
			}
		},

		toggleMessageVisibility: function _toggleMessageVisibility(makeVisible){
			//TODO: Do this with an animation to fade in or out.
			this.view.messageLabel.setVisibility(makeVisible);
		},

		showMessage: function _showMessage(message){
			if(typeof kony.i18n.getLocalizedString2 === "function"){
				this.view.messageLabel.text = kony.i18n.getLocalizedString2(message);
			}
			else{
				this.view.messageLabel.text = kony.i18n.getLocalizedString(message);
			}
			this.toggleMessageVisibility(true);
		},

		login: function _login(){
			this.toggleMessageVisibility(false);
			let user = this.view.userTextBox.text;
			let password = this.view.passwordTextBox.text;

			//If both the user and password fields have more than 4 characters each.
			if(user && !userRegex.test(user)){
				//TODO: Expose field for invalid password i18n.
				this.showMessage(this._invalidUserMessage);
				amplify.publish("Login.invalidUser");
			}
			else if(password && !passwordRegex.test(password)){
				//TODO: Expose field for invalid password i18n.
				this.showMessage(this._invalidPasswordMessage);
				amplify.publish("Login.invalidPassword");
			}
			else if(user && password && userRegex.test(user) & passwordRegex.test(password)){
				/*global amplify*/
				amplify.publish("Login.valid", user, password);
			}
		},

		setMessage: function(message){
			this.view.messageLabel.text = message;
			this.view.messageLabel.isVisible = true;
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {

			//Hide the message label. It's visible for design purposes only.
			this.view.messageLabel.isVisible = false;

			//Bind the eye icon to show or hide the password.
			this.view.showPasswordButton.onTouchEnd = this.togglePasswordVisibility;

			//Bind user and password fields to attempt login once both are filled.
			this.view.userTextBox.onDone = this.login;
			this.view.passwordTextBox.onDone = this.login;
			this.view.onKeyboardDidHide = this.login;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
			defineGetter(this, "invalidUserMessage", function () {
				return this._invalidUserMessage;
			});
			defineSetter(this, "invalidUserMessage", function (message) {
				this._invalidUserMessage = message;
			});

			defineGetter(this, "invalidPasswordMessage", function () {
				return this._invalidPasswordMessage;
			});
			defineSetter(this, "invalidPasswordMessage", function (message) {
				this._invalidPasswordMessage = message;
			});
		}
	};
});