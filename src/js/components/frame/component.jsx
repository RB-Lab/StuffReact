const React = require('react');
const MainMenu = require('../main-menu/component.jsx');
const Store = require('./store');

const views = {
	inbox: require('../views/inbox/component.jsx'),
	projects: require('../views/projects/component.jsx'),
	contexts: require('../views/contexts/component.jsx'),
	reference: require('../views/reference/component.jsx'),
	ideas: require('../views/ideas/component.jsx'),
	calendar: require('../views/calendar/component.jsx')
};

let App = React.createClass({

	getInitialState() {
		return {currentView: this._getView()};
	},

	_onChange() {
		this.setState({currentView: this._getView()});
	},

	_getView(){
		return views[Store.getState().currentView];
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
				<this.state.currentView/>
			</div>
		);
	}

});

module.exports = App;
