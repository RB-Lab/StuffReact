var AppDispatcher = require('../../app-dispatcher');
var Constants = require('./constants');

module.exports = {

	changePage: function(page) {
		AppDispatcher.handleViewAction({
			type: Constants.CHANGE_PAGE,
			data: {
				page: page
			}
		});
	}

};
