const window = require('./window');
const Promise = require('promise'); // jshint ignore:line

module.exports = {
	save(name, payload){
		return new Promise((resolve) => {
			window.localStorage.setItem(name, JSON.stringify(payload));
			resolve();
		});
	},
	get(name){
		return new Promise((resolve) => {
			const item = window.localStorage.getItem(name);
			try {
				resolve(JSON.parse(item));
			} catch (ignore) {
				resolve(item);
			}
		});
	}
};
