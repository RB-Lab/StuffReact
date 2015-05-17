const _ = require('lodash');
const AppDispatcher = require('app-dispatcher');
const assign = require('object-assign');
const GeneralStore = require('stores/general-store');
const contextsConstants = require('components/views/contexts/constants');
const storage = require('lib/storage');
const Context = require('models/context');
const STOARGES = require('constants/app-constants').stoages;
const {Map} = require('immutable'); /* jshint ignore: line */ // redefinition of Map - now it's immutable


var contexts = [];

var ProjectsStore = assign({}, GeneralStore, {

	getLastItem(){
		return contexts[contexts.length - 1];
	},

	getAll(){
		return contexts; // TODO inverse?
	},

	getById(id){
		return _.find(contexts, (item) => {return item.get('id') === id;});
	},

	reread: init

});

// initial loading items array from storage
function init(){
	storage.get(STOARGES.CONTEXTS_STORAGE).then((storedItems) => {
		if (_.isArray(storedItems)){
			storedItems.forEach((item) => {
				contexts.push(new Map(item));
				ProjectsStore.emitChange();
			});
		}
	}).catch(function(){
		// TODO what?
	});
}

init();

AppDispatcher.register(function(payload){
	switch(payload.action.type){
		case contextsConstants.ADD_CONTEXT:
			contexts.push(new Map(new Context(payload.action.data.contextName)));
			ProjectsStore.emitChange();
			break;
	}
});

module.exports = ProjectsStore;
