function Controller() {
    function btnNextClicked() {
        if (isNaN($.txtmobilenumber.value) || 10 != $.txtmobilenumber.value.length) alert("Please enter a valid mobile number."); else {
            var xpng = require("xpng");
            xpng.openWin(Alloy.CFG.nav, "refillDetails", {
                mobileNumber: $.txtmobilenumber.value,
                rxNumber: args.rxNumber
            });
            Ti.App.addEventListener("closeView", function() {
                $.winContactInfo.close({
                    animated: false
                });
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contactInfo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.winContactInfo = Ti.UI.createWindow({
        backgroundColor: "white",
        barColor: Alloy.Globals.clientColor,
        navTintColor: "White",
        titleAttributes: {
            color: "white"
        },
        id: "winContactInfo",
        title: "Enter your contact info"
    });
    $.__views.winContactInfo && $.addTopLevelView($.__views.winContactInfo);
    $.__views.contactScrollView = Ti.UI.createScrollView({
        top: 0,
        width: "100%",
        height: Ti.UI.FILL,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false,
        backgroundColor: "white",
        horizontalBounce: false,
        id: "contactScrollView"
    });
    $.__views.winContactInfo.add($.__views.contactScrollView);
    $.__views.__alloyId0 = Ti.UI.createView({
        top: 0,
        height: Titanium.UI.SIZE,
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.contactScrollView.add($.__views.__alloyId0);
    $.__views.imgcontactinfo = Ti.UI.createImageView({
        top: 20,
        height: 100,
        id: "imgcontactinfo",
        image: "/images/imgcontact.PNG",
        width: Ti.UI.SIZE
    });
    $.__views.__alloyId0.add($.__views.imgcontactinfo);
    $.__views.lblcontactinfoinstruction = Ti.UI.createLabel({
        color: Alloy.Globals.clientColor,
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "10dp",
        right: "10dp",
        top: "15dp",
        id: "lblcontactinfoinstruction",
        text: "Just in case we need to contact you regarding your prescription."
    });
    $.__views.__alloyId0.add($.__views.lblcontactinfoinstruction);
    $.__views.txtmobilenumber = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 5,
        width: Ti.UI.FILL,
        top: "15dp",
        left: "10dp",
        right: "10dp",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "txtmobilenumber",
        hintText: "Mobile number"
    });
    $.__views.__alloyId0.add($.__views.txtmobilenumber);
    btnNextClicked ? $.__views.txtmobilenumber.addEventListener("return", btnNextClicked) : __defers["$.__views.txtmobilenumber!return!btnNextClicked"] = true;
    $.__views.btnNext = Ti.UI.createButton({
        top: "10dp",
        left: "5dp",
        width: Ti.UI.FILL,
        height: "40dp",
        right: "5dp",
        bottom: "5dp",
        backgroundColor: Alloy.Globals.clientColor,
        color: "White",
        selectedColor: "black",
        borderRadius: 5,
        title: "Next",
        id: "btnNext"
    });
    $.__views.__alloyId0.add($.__views.btnNext);
    btnNextClicked ? $.__views.btnNext.addEventListener("click", btnNextClicked) : __defers["$.__views.btnNext!click!btnNextClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    __defers["$.__views.txtmobilenumber!return!btnNextClicked"] && $.__views.txtmobilenumber.addEventListener("return", btnNextClicked);
    __defers["$.__views.btnNext!click!btnNextClicked"] && $.__views.btnNext.addEventListener("click", btnNextClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;