const _ = require('lodash');
const randomstring = require('randomstring');

function Context(initValue){
	initValue = _.isObject(initValue) ? initValue : {title: initValue || ''};

	this.id = randomstring.generate(5);
	this.title = initValue.title;
	this.description = initValue.description || '';
}

module.exports = Context;
