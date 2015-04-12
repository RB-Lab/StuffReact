const React = require('react');
const {RaisedButton, TextField} = require('material-ui');
const Actions = require('./action-creator');
const KEYS = require('../../../constants/key-codes');
const ItemsStore = require('../../../stores/items-store');

let Inbox = React.createClass({

	getInitialState(){
		return {
			currentValue: '',
			inbox: ItemsStore.getInbox()
		};
	},

	_add() {
		if(!this.state.currentValue) return;
		Actions.addItem(this.state.currentValue);
		this.setState({currentValue: ''});
	},

	_addAndManage(){},

	_onInputKeyDown(e){
		if(e.keyCode === KEYS.ENTER) return this._add();
	},

	_onInputChange(e){
		this.setState({currentValue: e.currentTarget.value});
	},

	_onItemsChange(){
		this.setState({inbox: ItemsStore.getInbox()});
	},

	componentDidMount() {
		ItemsStore.addChangeListener(this._onItemsChange);
	},

	componentWillUnmount() {
		ItemsStore.removeChangeListener(this._onItemsChange);
	},

	render() {
		return (
			<section>
				<div>
					<TextField hintText='Add new item'
						value={this.state.currentValue}
						onKeyDown={this._onInputKeyDown}
						onChange={this._onInputChange}
					/>
				</div>
				<RaisedButton label='Add' onClick={this._add} />&nbsp;
				<RaisedButton label='Add and manage' onClick={this._addAndManage} />
				<ul>
				{this.state.inbox.map((item) => {
					return(
						<li>{item.title}</li>
					);
				})}
				</ul>
			</section>
		);
	}

});

module.exports = Inbox;

