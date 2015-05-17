const window = require('lib/window');
const xhr = require('xhr');
const Promise = require('promise'); // jshint ignore:line
const storage = require('lib/storage');

const HOST = 'webdavHost';
const TOKEN = 'token';

function sendRequest(method, name, payload){
	return new Promise((resolve, reject) => {

		Promise.all([storage.get(HOST), storage.get(TOKEN)])
			.then((res) => {
				let host = res[0];
				let token = res[1];
				if(!host) return reject(new Error('Webdav host is not set'));
				if(!token) return reject(new Error('Webdav creditials are not set'));

				xhr({
					uri: host + name,
					body: payload,
					method: method,
					headers: {
						'Authorization': 'Basic ' + token,
						'Content-Type': 'text/plain'
					}
				}, (err, res) => {
					if(err) return reject(new Error('Request declined by browser'));
					if(res.statusCode >= 400) return reject(new Error(res.statusCode + ': ' + res.rawRequest.statusText));
					resolve(res.body);
				});
			})
			.catch(reject);
	});
}


module.exports = {
	setCreditials(name, pass){
		return storage.save(TOKEN, window.btoa(name + ':' + pass));
	},
	setHost(host){
		return storage.save(HOST, host);
	},
	save(name, payload){
		return sendRequest('PUT', name, payload);
	},
	get(name){
		return sendRequest('GET', name);
	}
};
