const _ = require('lodash');
const AppDispatcher = require('app-dispatcher');
const assign = require('object-assign');
const GeneralStore = require('stores/general-store');
const projectsConstants = require('components/views/projects/constants');
const manageProjectsConstants = require('components/views/manage-project/constants');
const storage = require('lib/storage');
const Project = require('models/project');
const STOARGES = require('constants/app-constants').stoages;
const {Map} = require('immutable'); /* jshint ignore: line */ // redefinition of Map - now it's immutable


var projects = [];

var ProjectsStore = assign({}, GeneralStore, {

	getLastItem(){
		return projects[projects.length - 1];
	},

	getAll(){
		return projects;
	},

	getById(id){
		return _.find(projects, (item) => {return item.get('id') === id;});
	},


	setProjects(newProject){
		var index;
		_.find(projects, (item, i) => {
			index = i;
			return item.get('id') === newProject.get('id');
		});
		projects[index] = newProject;
	},

	reread: init
});

function init(){
	// initial loading items array from storage
	storage.get(STOARGES.PROJECTS_STORAGE).then((storedItems) => {
		if (_.isArray(storedItems)){
			storedItems.forEach((item) => {
				projects.push(new Map(item));
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
		case projectsConstants.ADD_PROJECT:
			projects.push(new Map(new Project(payload.action.data.projecName)));
			ProjectsStore.emitChange();
			break;
		case manageProjectsConstants.CHANGE_PROJECT:
			ProjectsStore.setProjects(payload.action.data);
			ProjectsStore.emitChange();
			break;
	}
});

module.exports = ProjectsStore;
