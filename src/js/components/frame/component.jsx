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
		'use strict';
		return {currentView: this._getView()};
	},

	_onChange() {
		'use strict';
		this.setState({currentView: this._getView()});
	},

	_getView(){
		'use strict';
		return views[Store.getState().currentView];
	},

	componentDidMount() {
		'use strict';
		Store.addChangeListener(this._onChange);
	},

	componentWillUnmount() {
		'use strict';
		Store.removeChangeListener(this._onChange);
	},

	render() {
		'use strict';
		return (
			<div id="frame">
				<MainMenu />
				<this.state.currentView/>
			</div>
		);
	}

});

module.exports = App;
