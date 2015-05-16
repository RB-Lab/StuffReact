const AppDispatcher = require('app-dispatcher');
const STOARGES = require('constants/app-constants').stoages;
const storageActions = require('constants/app-constants').storageActions;
const ItemsStore = require('stores/items-store');
const storage = require('lib/storage');

module.exports = {

	setContext(item, context) {

		AppDispatcher.handleViewAction({
			type: storageActions.SET_ITEM,
			data: item.set('context', context)
		});

		storage.save(STOARGES.ITEMS_STORAGE, ItemsStore.getAll()).catch(function(){
			// TODO error handling (saving attempts must be in storage)
		});
	},

	setProject(item, project) {

		AppDispatcher.handleViewAction({
			type: storageActions.SET_ITEM,
			data: item.set('project', project)
		});

		storage.save(STOARGES.ITEMS_STORAGE, ItemsStore.getAll()).catch(function(){
			// TODO error handling (saving attempts must be in storage)
		});
	}

};
