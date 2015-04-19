var AppDispatcher = require('app-dispatcher');
var Constants = require('./constants');
var frameActions = require('components/frame/action-creator');
var ItemsStore = require('stores/items-store');

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
		// TODO move all pages to some.. file?
		frameActions.changePage('type-selector', ItemsStore.getLastItem());
	}

};
