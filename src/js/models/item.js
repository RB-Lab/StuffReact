const _ = require('lodash');
const randomstring = require('randomstring');
const TYPES = require('constants/item-types');

function Item(initValue){

	initValue = _.isObject(initValue) ? initValue : {title: initValue || ''};

	this.id = randomstring.generate(5);
	this.type = initValue.type || '';
	this.context = initValue.context || null;
	this.project = initValue.project || null;
	this.title = initValue.title;
	this.description = initValue.description || '';
	this.done = initValue.done || false;
}

Item.isInbox = function(item){
	return !(item.get('context') && item.get('project')) && !item.get('done') && item.get('type') !== TYPES.TYPE_IDEA;
};

module.exports = Item;
