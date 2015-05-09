const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const STOARGES = require('constants/app-constants').stoages;
const frameActions = require('components/frame/actions');
const ItemsStore = require('stores/items-store');
const storage = require('lib/storage');
const PAGES = require('constants/pages').PAGES;
const ITEM_TYPE_TO_PAGE_MAP = require('constants/pages').ITEM_TYPE_TO_PAGE_MAP;

module.exports = {

	addItem(itemName) {
		AppDispatcher.handleViewAction({
			type: Constants.ADD_ITEM,
			data: {
				itemName: itemName
			}
		});
		// TODO maybe it's bettter to attach save action to 'change' event? But where to do so?
		storage.save(STOARGES.ITEMS_STORAGE, ItemsStore.getAll()).catch(function(){
			// TODO try to save again up to 10 times then throw some warning
		});
	},

	manageItem(item){
		if(!item.get('type')){
			frameActions.changePage(PAGES.TYPE_SELECTOR, item);
		} else {
			frameActions.changePage(ITEM_TYPE_TO_PAGE_MAP[item.get('type')], item);
		}
	},

	addAndManage(itemName) {
		this.addItem(itemName);
		this.manageItem(ItemsStore.getLastItem());
	}

};
