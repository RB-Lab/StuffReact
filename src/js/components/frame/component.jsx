const React = require('react');
const MainMenu = require('../main-menu/component.jsx');
const Store = require('./store');

const views = {
	inbox: require('../views/inbox/component.jsx'),
	projects: require('../views/projects/component.jsx'),
	contexts: require('../views/contexts/component.jsx'),
	reference: require('../views/reference/component.jsx'),
	ideas: require('../views/ideas/component.jsx'),
	calendar: require('../views/calendar/component.jsx'),
	'type-selector': require('../views/type-selector/component.jsx')
};

let App = React.createClass({

	getInitialState() {
		return this._getState();
	},

	_onChange() {
		this.setState(this._getState());
	},

	_getState(){
		var storeState = Store.getState();
		return {currentView: views[storeState.currentView], data: storeState.data};
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
