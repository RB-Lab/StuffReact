const React = require('react');
const {LeftNav, IconButton, Dialog, TextField, FloatingActionButton, Snackbar} = require('material-ui');
const frameActions = require('components/frame/actions');
const WebdavStorage = require('lib/webdav-storage');
const Storage = require('lib/storage');
const projectsStore = require('stores/projects-store');
const contextsStore = require('stores/contexts-store');
const itemsStore = require('stores/items-store');
const STOARGES = require('constants/app-constants').stoages;

const pages = require('constants/pages').MAIN_MENU.map(item => {
	return {
		payload: item,
		// TODO here must be i18n, not capitalization
		text: item.charAt(0).toUpperCase() + item.slice(1)
	};
});

const STORAGE_NAME = '/stuff.controll.bac';

let MainMenu = React.createClass({

	menuItems: pages,

	getInitialState(){
		return {message: ''};
	},

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

	uploadToCloud_(){ // TODO move all this stuff to actions and sotre
		WebdavStorage.save(STORAGE_NAME, JSON.stringify({
			projects: projectsStore.getAll(),
			contexts: contextsStore.getAll(),
			items: itemsStore.getAll()
		})).then(() => {
			this.setState({message: 'Uploaded successfully'});
			this.refs.sysMessage.show();
		}).catch((e) => {
			this.setState({message: e});
			this.refs.sysMessage.show();
		});
	},

	downloadFromCloud_(){ // TODO move all this stuff to actions and sotre
		WebdavStorage.save(STORAGE_NAME).then((res) => {
			res = JSON.parse(res);
			Storage.save(STOARGES.CONTEXTS_STORAGE, res.contexts);
			Storage.save(STOARGES.PROJECTS_STORAGE, res.projects);
			Storage.save(STOARGES.CONTEXTS_STORAGE, res.items);
			projectsStore.reread();
			contextsStore.reread();
			itemsStore.reread();
			this.setState({message: 'Uploaded successfully'});
			this.refs.sysMessage.show();
		}).catch((e) => {
			this.setState({message: e});
			this.refs.sysMessage.show();
		});
	},

	updateSettings_(){ // TODO move all this stuff to actions and sotre
		WebdavStorage.setHost(this.refs.wedDavHost.getValue());
		WebdavStorage.setCreditials(this.refs.webDavUser.getValue(), this.refs.webDavPassword.getValue());
		this.refs.settingsDialog.dissmiss();
	},

	render() {
		let settingsActions = [
			{text: 'Cancel'},
			{text: 'ok', onClick: this.updateSettings_, ref: 'ok'}
		];

					/* TODO make sync button available if creditials are set only */
					/* TODO mover these dialogs to separate components */
					/* TODO mover snackbar to frame */
					/* TODO fill settings form with initial values */

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

				<Snackbar ref='sysMessage' message={this.state.message} />
			</header>
		);
	}

});

module.exports = MainMenu;
