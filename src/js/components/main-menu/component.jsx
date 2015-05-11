const React = require('react');
const {LeftNav, IconButton} = require('material-ui');
const frameActions = require('components/frame/actions');

const pages = require('constants/pages').MAIN_MENU.map(item => {
	return {
		payload: item,
		// TODO here must be i18n, not capitalization
		text: item.charAt(0).toUpperCase() + item.slice(1)
	};
});


let MainMenu = React.createClass({

	menuItems: pages,

	_onChange(e, i) {
		frameActions.changePage(this.menuItems[i].payload);
	},

	onMenuClick_(){
		this.refs.LeftNav.toggle();
	},

	render() {
		return (
			<header id='main-menu'>
				<IconButton iconClassName='md-menu md-3x' tooltip='Main menu' onClick={this.onMenuClick_}/>
				<LeftNav ref='LeftNav' docked={false} menuItems={this.menuItems} onChange={this._onChange}/>
			</header>
		);
	}

});

module.exports = MainMenu;
