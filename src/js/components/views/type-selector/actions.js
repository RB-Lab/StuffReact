const AppDispatcher = require('app-dispatcher');
const STOARGES = require('constants/app-constants').stoages;
const storageActions = require('constants/app-constants').storageActions;
const frameActions = require('components/frame/actions');
const ItemsStore = require('stores/items-store');
const storage = require('lib/storage');
const ITEM_TYPE_TO_PAGE_MAP = require('constants/pages').ITEM_TYPE_TO_PAGE_MAP;

module.exports = {

	setItemType(item, type) {
		const newItem = item.set('type', type);

		AppDispatcher.handleViewAction({
			type: storageActions.SET_ITEM,
			data: {
				oldItem: item,
				newItem: newItem
			}
		});

		storage.save(STOARGES.ITEMS_STORAGE, ItemsStore.getAll()).catch(function(){
			// TODO error handling (saving attempts must be in storage)
		});

		frameActions.changePage(ITEM_TYPE_TO_PAGE_MAP[type], newItem); // NOTE maybe this shit have to be in component?
	}

};
