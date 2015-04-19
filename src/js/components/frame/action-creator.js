const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');

module.exports = {

	changePage(page, data) {
		AppDispatcher.handleViewAction({
			type: Constants.CHANGE_PAGE,
			data: {
				page: page,
				data: data || {}
			}
		});
	}

};
