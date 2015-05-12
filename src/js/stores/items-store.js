const _ = require('lodash');
const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('app-dispatcher');
const inboxConstants = require('components/views/inbox/constants');
const storageActions = require('constants/app-constants').storageActions;
const storage = require('lib/storage');
const STOARGES = require('constants/app-constants').stoages;
const Item = require('models/item');
const {Map} = require('immutable'); /* jshint ignore: line */ // redefinition of Map - now it's immutable


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
		return items.filter(Item.isInbox).reverse();
	},

	getLastItem(){
		return items[items.length - 1];
	},

	getAll(){
		return items;
	},

	setItem(oldItem, newItem){
		var index = items.indexOf(oldItem);
		if(index < 0) debugger; // FIXME we still get here when undo "done" actions
		items[index] = newItem;
	}

});

// initial loading items array from storage
storage.get(STOARGES.ITEMS_STORAGE).then((storedItems) => {
	if (_.isArray(storedItems)){
		storedItems.forEach((item) => {
			items.push(new Map(new Item(item)));
			ItemsStore.emitChange();
		});
	}
}).catch(function(){
	// TODO what?
});

AppDispatcher.register(function(payload){
	switch(payload.action.type){
		case inboxConstants.ADD_ITEM:
			items.push(new Map(new Item(payload.action.data.itemName)));
			ItemsStore.emitChange();
			break;
		case storageActions.SET_ITEM:
			ItemsStore.setItem(payload.action.data.oldItem, payload.action.data.newItem);
			ItemsStore.emitChange();
			break;
	}
});

module.exports = ItemsStore;
