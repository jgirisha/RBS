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
	if (OS_ANDROID || OS_IOS) {
		Barcode.capture({
			animate : true,
			overlay : overlay,
			showCancel : true,
			showRectangle : true
		});
	} else if (OS_MOBILEWEB) {
		alert("Sorry! This feature is not available on a browser.");
	}

}

if (!OS_MOBILEWEB) {
	var Barcode = require('ti.barcode');
	Barcode.allowRotation = false;
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
		backgroundColor : '#888888',
		font : {
			fontWeight : 'bold',
			fontSize : 16
		},
		borderColor : 'transparent',
		opacity : 1,
		height : 30,
		top : 10
	});
	overlay.add(lblInsructionTop);

	var lblInsructionBottom = Ti.UI.createLabel({
		text : "Center the bar code within the rectangle. Hold the phone still from 6-8 inches away until it's scanned.",
		textAlign : 'center',
		color : '#fff',
		backgroundColor : '#888888',
		font : {
			fontSize : 14
		},
		borderColor : 'transparent',
		opacity : 1,
		height : 40,
		bottom : 0
	});
	overlay.add(lblInsructionBottom);

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
	
	//Barcode Scan: Cancel
	Barcode.addEventListener('cancel', function(e) {
		Barcode.cancel();
	});

	//On successful scan
	function loadNextPage() {
		var xpng = require('xpng');
		xpng.openWin(Alloy.CFG.nav, 'contactInfo', {
			rxNumber : rxNumber
		});
	}

}
