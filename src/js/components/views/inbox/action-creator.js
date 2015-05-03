const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const STOARGES = require('constants/app-constants').stoages;
const frameActions = require('components/frame/action-creator');
const ItemsStore = require('stores/items-store');
const storage = require('lib/storage');
const PAGES = require('constants/pages').PAGES;

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
		frameActions.changePage(PAGES.TYPE_SELECTOR, item);
	},

	addAndManage(itemName) {
		this.addItem(itemName);
		this.manageItem(ItemsStore.getLastItem());
	}

};
