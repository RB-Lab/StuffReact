const React = require('react');
const MainMenu = require('../main-menu/component.jsx');
const Store = require('./store');

const PAGES = require('constants/pages').PAGES;

var COMPONENTS = {};

COMPONENTS[PAGES.INBOX] = require('components/views/inbox/component.jsx');
COMPONENTS[PAGES.PROJECTS] = require('components/views/projects/component.jsx');
COMPONENTS[PAGES.CONTEXTS] = require('components/views/contexts/component.jsx');
COMPONENTS[PAGES.REFERENCE] = require('components/views/reference/component.jsx');
COMPONENTS[PAGES.IDEAS] = require('components/views/ideas/component.jsx');
COMPONENTS[PAGES.CALENDAR] = require('components/views/calendar/component.jsx');
COMPONENTS[PAGES.TYPE_SELECTOR] = require('components/views/type-selector/component.jsx');
COMPONENTS[PAGES.MANAGE_ACTION] = require('components/views/manage-action/component.jsx');
COMPONENTS[PAGES.MANAGE_REFERENCE] = require('components/views/manage-reference/component.jsx');
COMPONENTS[PAGES.MANAGE_IDEA] = require('components/views/manage-idea/component.jsx');
COMPONENTS[PAGES.ACTION_DELEGATE] = require('components/views/action-delegate/component.jsx');
COMPONENTS[PAGES.ACTION_SCHEDULE] = require('components/views/action-schedule/component.jsx');

let App = React.createClass({

	getInitialState() {
		return this._getState();
	},

	_onChange() {
		this.setState(this._getState());
	},

	_getState(){
		var storeState = Store.getState();
		return {currentView: COMPONENTS[storeState.currentView], data: storeState.data};
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	render() {
		return (
			<div id="frame">
				<MainMenu />
				<this.state.currentView data={this.state.data}/>
			</div>
		);
	}

});

module.exports = App;
