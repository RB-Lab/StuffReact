const _ = require('lodash');

function Item(initValue){

	initValue = _.isObject(initValue) ? initValue : {title: initValue || ''};

	this.type = initValue.type || '';
	this.context = initValue.context || null;
	this.project = initValue.project || null;
	this.title = initValue.title;
	this.description = initValue.description || '';
}

Item.prototype.isInbox = function(){
	return !(this.context && this.project);
};

module.exports = Item;
