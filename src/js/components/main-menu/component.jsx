const React = require('react');
const {LeftNav, IconButton, Dialog, TextField, FloatingActionButton,FontIcon} = require('material-ui');
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

	onSyncClick_(){
		this.refs.syncDialog.show();
	},

	onSettingsClick_(){
		this.refs.settingsDialog.show();
	},

	uploadToCloud_(){},

	downloadFromCloud_(){},

	render() {
		let settingsActions = [
			{text: 'Cancel'},
			{text: 'ok', onClick: this.updateSettings, ref: 'ok'}
		];

		return (
			<header className='main-menu'>
				<IconButton iconClassName='md-menu md-3x' tooltip='Main menu' onClick={this.onMenuClick_}/>
				<LeftNav ref='LeftNav' docked={false} menuItems={this.menuItems} onChange={this._onChange}/>
				<div className='main-menu__right-pane'>
					<IconButton iconClassName='md-backup md-3x' tooltip='Sync with clouds' onClick={this.onSyncClick_}/>
					<IconButton iconClassName='md-settings md-3x' tooltip='Settings' onClick={this.onSettingsClick_}/>
				</div>

				<Dialog className='settings-dialog' ref='settingsDialog' title='Settings' actions={settingsActions} actionFocus='ok'>
					<TextField className='settings-dialog__text-field' floatingLabelText='WebDAV host' ref='wedDavHost'/>
					<TextField className='settings-dialog__text-field' floatingLabelText='WebDAV username' ref='webDavUser'/>
					<TextField className='settings-dialog__text-field' floatingLabelText='WebDAV password' type='password' ref='webDavPassword' />
				</Dialog>

				<Dialog className='sync-dialog' ref='syncDialog'>
					<FloatingActionButton className='sync-dialog__button' onClick={this.uploadToCloud_} iconClassName='md-cloud-upload md-2x'  secondary={true}/>
					<FloatingActionButton className='sync-dialog__button' onClick={this.downloadFromCloud_} iconClassName='md-cloud-download md-2x'  secondary={true}/>
				</Dialog>
			</header>
		);
	}

});

module.exports = MainMenu;
