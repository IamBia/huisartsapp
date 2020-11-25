var exec = require('cordova/exec');
var platform = require('cordova/platform');

module.exports = {

    dial: function (phnum, error) {
        if (platform.id = 'ios') {
            exec(null, error, 'PhoneDialer', 'dial', [phnum]);
        } else {
            document.location.href = 'tel:' + phnum;
        }
    }

};
