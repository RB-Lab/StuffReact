const React = require('react');
const {DropDownMenu} = require('material-ui');
const frameActions = require('components/frame/action-creator');

const pages = require('constants/pages').MAIN_MENU.map(item => {
	return {
		payload: item,
		// TODO here must be i18n, not capitalization
		text: item.charAt(0).toUpperCase() + item.slice(1)
	}
});


let MainMenu = React.createClass({

	menuItems: pages,

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
