const _ = require('lodash');
const TYPES = require('constants/item-types');

function Item(initValue){

	initValue = _.isObject(initValue) ? initValue : {title: initValue || ''};

	this.type = initValue.type || '';
	this.context = initValue.context || null;
	this.project = initValue.project || null;
	this.title = initValue.title;
	this.description = initValue.description || '';
	this.done = initValue.done || false;
}

Item.prototype.isInbox = function(){
	return !(this.context && this.project) && !this.done && this.type !== TYPES.TYPE_IDEA;
};

module.exports = Item;
