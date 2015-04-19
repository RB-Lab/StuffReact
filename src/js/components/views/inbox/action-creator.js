var AppDispatcher = require('app-dispatcher');
var Constants = require('./constants');
var changePageActionCreator = require('actions/change-page');
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
		changePageActionCreator.changePage('type-selector', ItemsStore.getLastItem());
	}

};
