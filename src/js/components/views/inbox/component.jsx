const React = require('react');
const {RaisedButton, TextField} = require('material-ui');
const Actions = require('./actions');
const KEYS = require('constants/key-codes');
const ItemsStore = require('stores/items-store');
const Item = require('components/ui/item/component.jsx');

let Inbox = React.createClass({

	getInitialState(){
		return {
			currentValue: '',
			inbox: ItemsStore.getInbox()
		};
	},

	add_() {
		if(!this.state.currentValue) return;
		Actions.addItem(this.state.currentValue);
		this.setState({currentValue: ''});
	},

	addAndManage_(){
		if(!this.state.currentValue) return;
		Actions.addAndManage(this.state.currentValue);
		this.setState({currentValue: ''});
	},

	onInputKeyDown_(e){
		if(e.keyCode === KEYS.ENTER) return this.add_();
	},

	onInputChange_(e){
		this.setState({currentValue: e.currentTarget.value});
	},

	onItemsChange_(){
		this.setState({inbox: ItemsStore.getInbox()});
	},

	componentDidMount() {
		ItemsStore.addChangeListener(this.onItemsChange_);
	},

	componentWillUnmount() {
		ItemsStore.removeChangeListener(this.onItemsChange_);
	},

	manageItem_(item){
		Actions.manageItem(item)
	},

	render() {
		return (
			<section>
				<div>
					<TextField hintText='Add new item'
						value={this.state.currentValue}
						onKeyDown={this.onInputKeyDown_}
						onChange={this.onInputChange_}
					/>
				</div>
				<RaisedButton label='Add' onClick={this.add_} />&nbsp;
				<RaisedButton label='Add and manage' onClick={this.addAndManage_} />
				<ul>
				{this.state.inbox.map((item) => {
					return(
						<Item item={item} onClick={this.manageItem_} />
					);
				})}
				</ul>
			</section>
		);
	}

});

module.exports = Inbox;

