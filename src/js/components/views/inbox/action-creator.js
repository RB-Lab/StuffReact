var AppDispatcher = require('../../../app-dispatcher');
var Constants = require('./constants');

module.exports = {

	addItem: function(itemName) {
		'use strict';
		AppDispatcher.handleViewAction({
			type: Constants.ADD_ITEM,
			data: {
				itemName: itemName
			}
		});
	},

	addAndManage: function(itemName) {
		'use strict';
		AppDispatcher.handleViewAction({
			type: Constants.ADD_AND_MANAGE,
			data: {
				itemName: itemName
			}
		});
	}

};
