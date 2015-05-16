const _ = require('lodash');
const AppDispatcher = require('app-dispatcher');
const assign = require('object-assign');
const GeneralStore = require('stores/general-store');
const inboxConstants = require('components/views/inbox/constants');
const storageActions = require('constants/app-constants').storageActions;
const storage = require('lib/storage');
const STOARGES = require('constants/app-constants').stoages;
const Item = require('models/item');
const {Map} = require('immutable'); /* jshint ignore: line */ // redefinition of Map - now it's immutable


let items = [];
let lastModifiedItem;

let ItemsStore = assign({}, GeneralStore, {

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
		lastModifiedItem = newItem;
	},

	getLastModifiedItem(){
		return lastModifiedItem;
	},

	getItem(id){
		return id; // TODO IMPLEMENT UIDS FOR ITEMS!!!!!!!!!!!1111ONEONEONE
	}

});

// initial loading items array from storage
storage.get(STOARGES.ITEMS_STORAGE).then((storedItems) => {
	if (_.isArray(storedItems)){
		storedItems.forEach((item) => {
			items.push(new Map(item));
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
