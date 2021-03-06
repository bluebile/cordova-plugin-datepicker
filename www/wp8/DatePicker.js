/**
 * Phonegap DatePicker Plugin Copyright (c) Greg Allen 2011 MIT Licensed
 * Reused and ported to Android plugin by Daniel van 't Oever
 */

/**
 * Constructor
 */
function DatePicker() {
  //this._callback;
}

/**
 * show - true to show the ad, false to hide the ad
 */
DatePicker.prototype.show = function(options, cb, errCb) {

	if (options.date) {
		options.date = options.date.getTime();
	}

	var defaults = {
		mode : 'date',
		date : '',
		minDate: 0,
		maxDate: 0,
		cancelText: '',
		okText: '',
		todayText: '',
		nowText: '',
		is24Hour: false
	};

	for (var key in defaults) {
		if (typeof options[key] !== "undefined") {
			defaults[key] = options[key];
		}
	}

	//this._callback = cb;

	var callback = function(message) {
		if(message != 'error'){
		    if (isNaN(message) == false) {
				cb(new Date(message));
			}
	        else {
	            cb();
	        }
		} else {
			// TODO error popup?
    	}
	}

	var errCallback = function(message) {
		if (typeof errCb === 'function') {
			errCb(message);
		}
	}

	var nativeFn = "selectDate";
	if (defaults.mode !== "date") {
		nativeFn = "selectTime"
	}

	cordova.exec(callback, errCallback, "DateTimePicker", nativeFn, [defaults.date]);
	//@TODO: fazer passar o default.
};

var datePicker = new DatePicker();
module.exports = datePicker;

// Make plugin work under window.plugins
if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.datePicker) {
    window.plugins.datePicker = datePicker;
}
