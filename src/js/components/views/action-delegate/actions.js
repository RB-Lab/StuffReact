const AppDispatcher = require('app-dispatcher');
const STOARGES = require('constants/app-constants').stoages;
const storageActions = require('constants/app-constants').storageActions;
const ItemsStore = require('stores/items-store');
const storage = require('lib/storage');

module.exports = {

	setItemDoneStatus(item, done) {

		AppDispatcher.handleViewAction({
			type: storageActions.SET_ITEM,
			data: {
				oldItem: item,
				newItem: item.set('done', done)
			}
		});

		storage.save(STOARGES.ITEMS_STORAGE, ItemsStore.getAll()).catch(function(){
			// TODO error handling (saving attempts must be in storage)
		});

		//frameActions.changePage(ITEM_TYPE_TO_PAGE_MAP[type], item); //TODO: jump to inbox?
	}

};
