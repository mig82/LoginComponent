/*
* Define a component's setters and getters in one line by just listing the fields -e.g.:
* initGettersSetters: function() {kony.mvc.genAccessors(this, ["foo","bar"]);}
*/
((definition) => {
	kony.mvc.genAccessors = definition;
})((compCtrl, fields) => {
	
	fields.forEach((fieldName) => {
		var internalFieldName = "_" + fieldName;
		defineGetter(compCtrl, fieldName, function () {
			return compCtrl[internalFieldName];
		});
		defineSetter(compCtrl, fieldName, function (message) {
			compCtrl[internalFieldName] = message;
		});
	});
});
