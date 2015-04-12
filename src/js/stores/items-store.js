const _ = require('lodash');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../app-dispatcher');
const inboxConstants = require('../components/views/inbox/constants');
const storage = require('../lib/storage');

const CHANGE_EVENT = 'change';
const STORAGE_NAME = 'items';

function Item(initValue){

	initValue = _.isObject(initValue) ? initValue : {title: initValue || ''};

	this.context = initValue.context || null;
	this.project = initValue.project || null;
	this.title = initValue.title;
	this.description = initValue.description || '';
}

Item.prototype.isInbox = function(){
	return !(this.context &&this.project);
};

var items = [];

var ItemsStore = assign({}, EventEmitter.prototype, {

	// Allow Controller-View to register itself with store
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	// triggers change listener above, firing controller-view callback
	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	getInbox(){
		return items.filter((item) => {
			return item.isInbox();
		}).reverse();
	}

});

storage.get(STORAGE_NAME, (err, storedItems) => {
	if (err) return; // throw err or what?
	if (_.isArray(storedItems)){
		storedItems.forEach((item) => {
			items.push(new Item(item));
			ItemsStore.emitChange();
		});
	}
});

AppDispatcher.register(function(payload){
	switch(payload.action.type){
		case inboxConstants.ADD_ITEM:
			items.push(new Item(payload.action.data.itemName));
			storage.save(STORAGE_NAME, items);
			ItemsStore.emitChange();
			break;
	}
});

module.exports = ItemsStore;
