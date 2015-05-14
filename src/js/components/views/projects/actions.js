const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const STOARGES = require('constants/app-constants').stoages;
const ProjectsStore = require('stores/projects-store');
const storage = require('lib/storage');

module.exports = {

	addProject(projecName) {
		AppDispatcher.handleViewAction({
			type: Constants.ADD_PROJECT,
			data: {
				projecName: projecName
			}
		});

		storage.save(STOARGES.PROJECTS_STORAGE, ProjectsStore.getAll())
			.catch(function(){});
	}

};
