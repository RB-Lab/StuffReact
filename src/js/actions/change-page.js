const AppDispatcher = require('../app-dispatcher');
const globalActions = require('../constants/app-constants').globalActions;

module.exports = {

	changePage(page, data) {
		AppDispatcher.handleViewAction({
			type: globalActions.CHANGE_PAGE,
			data: {
				page: page,
				data: data || {}
			}
		});
	}

};
