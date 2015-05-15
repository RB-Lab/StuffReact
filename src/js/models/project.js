const _ = require('lodash');
const randomstring = require('randomstring');

function Project(initValue){
	initValue = _.isObject(initValue) ? initValue : {title: initValue || ''};

	this.id = randomstring.generate(5);
	this.title = initValue.title;
	this.description = initValue.description || '';
	this.parent = initValue.parent || null;
}

module.exports = Project;
