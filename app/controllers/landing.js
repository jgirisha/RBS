var args = arguments[0] || {};
var rxNumber = "";

$.logoImage.image = "/images/" + Alloy.Globals.clientName + "/image_HeaderLogo.png";

function switchClient() {

	if (Alloy.Globals.clientName === "mscripts") {
		Alloy.Globals.clientName = "meijer";
		Alloy.Globals.clientColor = "#0062A5";

	} else {
		Alloy.Globals.clientName = "mscripts";
		Alloy.Globals.clientColor = "#ee6e1a";
	}

	$.logoImage.image = "/images/" + Alloy.Globals.clientName + "/image_HeaderLogo.png";

	$.scan.color = Alloy.Globals.clientColor;
	$.scan.borderColor = Alloy.Globals.clientColor;
	$.switchClient.color = Alloy.Globals.clientColor;

	$.footerLabel.backgroundColor = Alloy.Globals.clientColor;

}

//Scan Barcode
function scanClicked() {
	//Check if Mobile Web
	if (OS_MOBILEWEB) {
		alert("Sorry! This feature is not available on a browser.");
	}
	//Check if device has camera feature supported
	else if (Ti.Media.CAMERA_REAR === 1) {
		//Initialize camera
		Barcode.capture({
			animate : true,
			overlay : overlay,
			showCancel : false,
			showRectangle : true
		});
	} else {
		alert("Sorry! This feature is not available on your device.");
	}
}

if (Ti.Media.CAMERA_REAR === 1) {
	var Barcode = require('ti.barcode');
	Barcode.displayedMessage = '';
	Barcode.allowMenu = false;
	Barcode.allowInstructions = true;
	Barcode.useLED = false;

	//Overlay
	var overlay = Ti.UI.createView({
		backgroundColor : 'transparent',
		top : 0,
		right : 0,
		bottom : 0,
		left : 0
	});

	var lblInsructionTop = Ti.UI.createLabel({
		text : 'Show us the prescription you want to refill.',
		textAlign : 'center',
		color : '#fff',
		backgroundColor : (OS_IOS) ? '#888888' : 'transparent',
		font : {
			fontSize : 16
		},
		borderColor : 'transparent',
		opacity : 1,
		height : 30,
		width : Ti.UI.FILL,
		top : OS_IOS ? '20dp' : '10dp',
		left : '5dp',
		right : '5dp'
	});
	overlay.add(lblInsructionTop);

	var lblInsructionBottom = Ti.UI.createLabel({
		text : "Center the bar code within the rectangle. Hold the phone still from 6-8 inches away until it's scanned.",
		textAlign : 'center',
		color : '#fff',
		backgroundColor : (OS_IOS) ? '#888888' : 'transparent',
		font : {
			fontSize : 14
		},
		borderColor : 'transparent',
		opacity : 1,
		height : OS_IOS ? '60dp' : '40dp',
		width : Ti.UI.FILL,
		bottom : 0,
		left : '5dp',
		right : '5dp'
	});
	overlay.add(lblInsructionBottom);

	if (OS_IOS) {
		var cancelButton = Ti.UI.createButton({
			title : 'Cancel',
			textAlign : 'center',
			color : '#000',
			backgroundColor : '#fff',
			style : 0,
			font : {
				fontWeight : 'bold',
				fontSize : 16
			},
			borderColor : '#000',
			borderRadius : 10,
			borderWidth : 1,
			opacity : 1,
			width : 100,
			height : 30,
			bottom : 80
		});
		cancelButton.addEventListener('click', function() {
			Barcode.cancel();
		});
		overlay.add(cancelButton);

	}

	//Barcode scan: Success
	Barcode.addEventListener('success', function(e) {
		rxNumber = e.result;
		loadNextPage();
	});

	//Barcode Scan: Error
	Barcode.addEventListener('error', function(e) {
		// Barcode.cancel();
		alert('No valid barcode found. Please scan again.');
	});

	//On successful scan
	function loadNextPage() {
		var xpng = require('xpng');
		xpng.openWin(Alloy.CFG.nav, 'contactInfo', {
			rxNumber : rxNumber
		});
	}

}
