const AppDispatcher = require('app-dispatcher');
const Constants = require('./constants');
const STOARGES = require('constants/app-constants').stoages;
const ProjectsStore = require('stores/projects-store');
const storage = require('lib/storage');

module.exports = {

	changeProject(project, key, value) {
		AppDispatcher.handleViewAction({
			type: Constants.CHANGE_PROJECT,
			data: project.set(key, value)
		});

		storage.save(STOARGES.PROJECTS_STORAGE, ProjectsStore.getAll())
			.catch(() => {});
	}

};
