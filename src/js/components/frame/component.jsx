const React = require('react');
const MainMenu = require('../main-menu/component.jsx');
const Store = require('./store');

const views = require('page-manager').pages;

let App = React.createClass({

	getInitialState() {
		return this._getState();
	},

	_onChange() {
		this.setState(this._getState());
	},

	_getState(){
		var storeState = Store.getState();
		return {currentView: views[storeState.currentView].component, data: storeState.data};
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
