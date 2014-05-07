exports.openWin = function(navGroup, winName, payload) {
    if ("undefined" == typeof Alloy) {
        var w = winName;
        if (payload) {
            var payloadKeys = Object.keys(payload);
            payloadKeys.forEach(function(item, index) {
                w[payloadKeys[index]] = payload[item];
            });
        }
<<<<<<< HEAD
    } else var w = Alloy.createController(winName).getView();
=======
    } else var w = Alloy.createController(winName, payload || {}).getView();
>>>>>>> 291e3d13c9a6ef14948c30cf0d8e7695a8e14f46
    navGroup.open(w, {
        animated: true
    });
};