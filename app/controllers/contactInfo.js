var args = arguments[0] || {};


function btnNextClicked() {
	// alert("In Return!!");
	if (!(isNaN($.txtmobilenumber.value)) && $.txtmobilenumber.value.length == 10) {
		var xpng = require('xpng');
		xpng.openWin(Alloy.CFG.nav, 'refillDetails', {
			mobileNumber : $.txtmobilenumber.value,
			rxNumber : args.rxNumber
		});
		
			Ti.App.addEventListener('closeView', function(ev) {
		$.winContactInfo.close({
			animated : false
		});
	});
	
	} else {
		alert("Please enter a valid mobile number.");
	}
}
