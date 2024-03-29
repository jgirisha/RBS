function Controller() {
    function switchClient() {
        if ("mscripts" === Alloy.Globals.clientName) {
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
    function scanClicked() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "contactInfo");
    }
    function loadNextPage() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "contactInfo", {
            rxNumber: rxNumber
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "landing";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.landing = Ti.UI.createView({
        top: 0,
        height: Titanium.UI.FILL,
        width: Ti.UI.FILL,
        heigth: Ti.UI.FILL,
        id: "landing"
    });
    $.__views.landing && $.addTopLevelView($.__views.landing);
    $.__views.logoImage = Ti.UI.createImageView({
        top: "25dp",
        width: "141dp",
        height: "40dp",
        bottom: "5dp",
        backgroundColor: "white",
        center: {
            x: "50%",
            y: "100dp"
        },
        id: "logoImage"
    });
    $.__views.landing.add($.__views.logoImage);
    $.__views.scan = Ti.UI.createButton({
        center: {
            x: "50%",
            y: "50%"
        },
        width: "100dp",
        height: "100dp",
        color: Alloy.Globals.clientColor,
        backgroundColor: "white",
        borderColor: Alloy.Globals.clientColor,
        borderWidth: 2,
        title: "Refill by Scan",
        id: "scan"
    });
    $.__views.landing.add($.__views.scan);
    scanClicked ? $.__views.scan.addEventListener("click", scanClicked) : __defers["$.__views.scan!click!scanClicked"] = true;
    $.__views.switchClient = Ti.UI.createButton({
        bottom: "50dp",
        width: Ti.UI.FILL,
        height: "30dp",
        color: Alloy.Globals.clientColor,
        backgroundColor: "white",
        title: "Switch client",
        id: "switchClient"
    });
    $.__views.landing.add($.__views.switchClient);
    switchClient ? $.__views.switchClient.addEventListener("click", switchClient) : __defers["$.__views.switchClient!click!switchClient"] = true;
    $.__views.footerLabel = Ti.UI.createLabel({
        color: "white",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        bottom: 0,
        height: "20dp",
        backgroundColor: Alloy.Globals.clientColor,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM,
        text: "2014, mscripts LLC",
        id: "footerLabel"
    });
    $.__views.landing.add($.__views.footerLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var rxNumber = "";
    $.logoImage.image = "/images/" + Alloy.Globals.clientName + "/image_HeaderLogo.png";
    var Barcode = require("ti.barcode");
    Barcode.displayedMessage = "";
    Barcode.allowMenu = false;
    Barcode.allowInstructions = true;
    Barcode.useLED = false;
    var overlay = Ti.UI.createView({
        backgroundColor: "transparent",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    });
    var lblInsructionTop = Ti.UI.createLabel({
        text: "Show us the prescription you want to refill.",
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#888888",
        font: {
            fontSize: 16
        },
        borderColor: "transparent",
        opacity: 1,
        height: 30,
        width: Ti.UI.FILL,
        top: "20dp",
        left: "5dp",
        right: "5dp"
    });
    overlay.add(lblInsructionTop);
    var lblInsructionBottom = Ti.UI.createLabel({
        text: "Center the bar code within the rectangle. Hold the phone still from 6-8 inches away until it's scanned.",
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#888888",
        font: {
            fontSize: 14
        },
        borderColor: "transparent",
        opacity: 1,
        height: "60dp",
        width: Ti.UI.FILL,
        bottom: 0,
        left: "5dp",
        right: "5dp"
    });
    overlay.add(lblInsructionBottom);
    var cancelButton = Ti.UI.createButton({
        title: "Cancel",
        textAlign: "center",
        color: "#000",
        backgroundColor: "#fff",
        style: 0,
        font: {
            fontWeight: "bold",
            fontSize: 16
        },
        borderColor: "#000",
        borderRadius: 10,
        borderWidth: 1,
        opacity: 1,
        width: 100,
        height: 30,
        bottom: 80
    });
    cancelButton.addEventListener("click", function() {
        Barcode.cancel();
    });
    overlay.add(cancelButton);
    Barcode.addEventListener("success", function(e) {
        rxNumber = e.result;
        loadNextPage();
    });
    Barcode.addEventListener("error", function() {
        alert("No valid barcode found. Please scan again.");
    });
    __defers["$.__views.scan!click!scanClicked"] && $.__views.scan.addEventListener("click", scanClicked);
    __defers["$.__views.switchClient!click!switchClient"] && $.__views.switchClient.addEventListener("click", switchClient);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;