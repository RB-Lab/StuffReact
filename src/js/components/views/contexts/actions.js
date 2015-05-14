const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const STOARGES = require('constants/app-constants').stoages;
const ContextsStore = require('stores/contexts-store');
const storage = require('lib/storage');

module.exports = {

	addProject(contextName) {
		AppDispatcher.handleViewAction({
			type: Constants.ADD_CONTEXT,
			data: {
				contextName: contextName
			}
		});

		storage.save(STOARGES.CONTEXTS_STORAGE, ContextsStore.getAll())
			.catch(function(){});
	}

};
