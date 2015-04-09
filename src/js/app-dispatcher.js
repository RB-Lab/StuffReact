const Dispatcher = require('flux').Dispatcher;
const Constants = require('./constants/app-constants');
const assign = require('object-assign');

let AppDispatcher = assign(new Dispatcher(), {

	handleServerAction(action) {
		'use strict';
		let payload = {
			source: Constants.ActionSources.SERVER_ACTION,
			action: action
		};
		this.dispatch(payload);
	},

	handleViewAction(action) {
		'use strict';
		let payload = {
			source: Constants.ActionSources.VIEW_ACTION,
			action: action
		};
		this.dispatch(payload);
	}

});

module.exports = AppDispatcher;
