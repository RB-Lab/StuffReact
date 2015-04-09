const React = require('react');
const {DropDownMenu} = require('material-ui');
const Actions = require('./action-creator');


let MainMenu = React.createClass({

	menuItems: [
		{ payload: 'inbox', text: 'Inbox' },
		{ payload: 'projects', text: 'Projects' },
		{ payload: 'contexts', text: 'Contexts' },
		{ payload: 'reference', text: 'Reference' },
		{ payload: 'ideas', text: 'Ideas' },
		{ payload: 'calendar', text: 'Calendar' },
	],

	_onChange(e, i) {
		'use strict';
		Actions.changePage(this.menuItems[i].payload);
	},

	render() {
		'use strict';
		return (
			<header id="main-menu">
				<DropDownMenu menuItems={this.menuItems} onChange={this._onChange}/>
			</header>
		);
	}

});

module.exports = MainMenu;
