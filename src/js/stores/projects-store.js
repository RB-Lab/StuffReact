const _ = require('lodash');
const AppDispatcher = require('app-dispatcher');
const assign = require('object-assign');
const GeneralStore = require('stores/general-store');
const projectsConstants = require('components/views/projects/constants');
const storage = require('lib/storage');
const STOARGES = require('constants/app-constants').stoages;
const {Map} = require('immutable'); /* jshint ignore: line */ // redefinition of Map - now it's immutable


var items = [];

var ProjectsStore = assign({}, GeneralStore, {

	getLastItem(){
		return items[items.length - 1];
	},

	getAll(){
		return items;
	}

});

// initial loading items array from storage
storage.get(STOARGES.PROJECTS_STORAGE).then((storedItems) => {
	if (_.isArray(storedItems)){
		storedItems.forEach((item) => {
			items.push(new Map(item));
			ProjectsStore.emitChange();
		});
	}
}).catch(function(){
	// TODO what?
});

AppDispatcher.register(function(payload){
	switch(payload.action.type){
		case projectsConstants.ADD_PROJECT:
			items.push(new Map({title: payload.action.data.projecName}));
			ProjectsStore.emitChange();
			break;
	}
});

module.exports = ProjectsStore;
