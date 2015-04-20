const _ = require('lodash');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const inboxConstants = require('components/views/inbox/constants');
const storage = require('lib/storage');
const Item = require('models/item');
const STOARGES = require('constants/app-constants').stoages;


const CHANGE_EVENT = 'change';

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
	},

	getLastItem(){
		return items[items.length - 1];
	},

	getAll(){
		return items;
	}

});

// initial loading items array from storage
storage.get(STOARGES.ITEMS_STORAGE).then((storedItems) => {
	if (_.isArray(storedItems)){
		storedItems.forEach((item) => {
			items.push(new Item(item));
			ItemsStore.emitChange();
		});
	}
}).catch(function(){
	// TODO what?
});

AppDispatcher.register(function(payload){
	switch(payload.action.type){
		case inboxConstants.ADD_ITEM:
			items.push(new Item(payload.action.data.itemName));
			ItemsStore.emitChange();
			break;
	}
});

module.exports = ItemsStore;
