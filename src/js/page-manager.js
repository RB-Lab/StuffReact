const _ = require('lodash');

const CONTEXTS = {
	MAIN_MENU: 'main menu',
	MANAGE: 'manage'
};

module.exports = {
	pages: {
		inbox: {
			name: 'inbox', // TODO: name should repeat key. That's looks ugly
			text: 'Inbox',
			context: CONTEXTS.MAIN_MENU,
			component: require('components/views/inbox/component.jsx')
		},
		projects: {
			name: 'projects',
			text: 'Projects',
			context: CONTEXTS.MAIN_MENU,
			component: require('components/views/projects/component.jsx')
		},
		contexts: {
			name: 'contexts',
			text: 'Contexts',
			context: CONTEXTS.MAIN_MENU,
			component:require('components/views/contexts/component.jsx')
		},
		reference: {
			name: 'reference',
			text: 'Reference',
			context: CONTEXTS.MAIN_MENU,
			component: require('components/views/reference/component.jsx')
		},
		ideas: {
			name: 'ideas',
			text: 'Ideas',
			context: CONTEXTS.MAIN_MENU,
			component: require('components/views/ideas/component.jsx')
		},
		calendar: {
			name: 'calendar',
			text: 'Calendar',
			context: CONTEXTS.MAIN_MENU,
			component: require('components/views/calendar/component.jsx')
		},
		typeSelector: {
			name: 'typeSelector',
			context: CONTEXTS.MANAGE,
			component: require('components/views/type-selector/component.jsx')
		}
	},

	getMainMenu(){
		return _(this.pages).filter((page) => {
			return page.context === CONTEXTS.MAIN_MENU;
		}).map((page) => {
			return {payload: page.name, text: page.text};
		}).value();
	}
};
