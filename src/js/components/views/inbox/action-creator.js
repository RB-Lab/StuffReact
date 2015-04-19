const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const frameActions = require('components/frame/action-creator');
const ItemsStore = require('stores/items-store');

module.exports = {

	addItem: function(itemName) {
		AppDispatcher.handleViewAction({
			type: Constants.ADD_ITEM,
			data: {
				itemName: itemName
			}
		});
	},

	addAndManage: function(itemName) {
		this.addItem(itemName);
		// TODO in action creators you should requrie page-manager dynamically due to circular
		// dependencies. That's looks ugly.
		frameActions.changePage(require('page-manager').pages.typeSelector.name, ItemsStore.getLastItem());
	}

};
