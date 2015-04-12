const window = require('./window');
const _ = require('lodash');

module.exports = {
	save(name, payload, cb){
		window.localStorage.setItem(name, JSON.stringify(payload));
		if(_.isFunction(cb)) cb(null);
	},
	get(name, cb){
		const item = window.localStorage.getItem(name);
		try {
			cb(null, JSON.parse(item));
		} catch (ignore) {
			cb(null, item);
		}
	}
};
