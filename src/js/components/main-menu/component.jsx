const React = require('react');
const {DropDownMenu} = require('material-ui');
const frameActions = require('components/frame/action-creator');
const pages = require('page-manager');


let MainMenu = React.createClass({

	menuItems: pages.getMainMenu(),

	_onChange(e, i) {
		frameActions.changePage(this.menuItems[i].payload);
	},

	render() {
		return (
			<header id="main-menu">
				<DropDownMenu menuItems={this.menuItems} onChange={this._onChange}/>
			</header>
		);
	}

});

module.exports = MainMenu;
