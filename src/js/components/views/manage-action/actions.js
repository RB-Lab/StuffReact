const STOARGES = require('constants/app-constants').stoages;
//const frameActions = require('components/frame/actions');
const ItemsStore = require('stores/items-store');
const storage = require('lib/storage');

module.exports = {

	setItemDoneStatus(item, done) {
		item.done = done; // NOTE is it good practice to do it here, not in store?

		storage.save(STOARGES.ITEMS_STORAGE, ItemsStore.getAll()).catch(function(){
			// TODO error handling (saving attempts must be in storage)
		});

		//frameActions.changePage(ITEM_TYPE_TO_PAGE_MAP[type], item); //TODO: jump to inbox?
	}

};
