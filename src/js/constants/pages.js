const PAGES = {
	INBOX: 'inbox',
	PROJECTS: 'projects',
	CONTEXTS: 'contexts',
	REFERENCE: 'reference',
	IDEAS: 'ideas',
	CALENDAR: 'calendar',
	TYPE_SELECTOR: 'typeSelector',
	MANAGE_ACTION: 'manageAction',
	MANAGE_REFERENCE: 'manageReference',
	MANAGE_IDEA: 'manageIdea'
};

const MAIN_MENU = [
	PAGES.INBOX,
	PAGES.PROJECTS,
	PAGES.CONTEXTS,
	PAGES.REFERENCE,
	PAGES.IDEAS,
	PAGES.CALENDAR
];

const TYPES = require('constants/item-types');

var type2pageMap = {};
type2pageMap[TYPES.TYPE_ACTION] = PAGES.MANAGE_ACTION;
type2pageMap[TYPES.TYPE_REFERENCE] = PAGES.MANAGE_REFERENCE;
type2pageMap[TYPES.TYPE_IDEA] = PAGES.MANAGE_IDEA;

module.exports = {
	PAGES: PAGES,
	MAIN_MENU: MAIN_MENU,
	ITEM_TYPE_TO_PAGE_MAP: type2pageMap
};
