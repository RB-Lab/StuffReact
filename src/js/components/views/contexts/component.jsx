const React = require('react');
const {RaisedButton, TextField} = require('material-ui');
const Actions = require('./actions');
const KEYS = require('constants/key-codes');
const ContextsStore = require('stores/contexts-store');
const Item = require('components/ui/item/component.jsx');

let Inbox = React.createClass({

	getInitialState(){
		return {
			currentValue: '',
			contexts: ContextsStore.getAll()
		};
	},

	componentDidMount() {
		ContextsStore.addChangeListener(this.onItemsChange_);
	},

	componentWillUnmount() {
		ContextsStore.removeChangeListener(this.onItemsChange_);
	},

	add_() {
		if(!this.state.currentValue) return;
		Actions.addProject(this.state.currentValue);
		this.setState({currentValue: ''});
	},

	onInputKeyDown_(e){
		if(e.keyCode === KEYS.ENTER) return this.add_();
	},

	onInputChange_(e){
		this.setState({currentValue: e.currentTarget.value});
	},

	onItemsChange_(){
		this.setState({contexts: ContextsStore.getAll()});
	},

	manageContext_(){
		console.log('manage context');
	},

	render() {
		return (
			<section>
				<div>
					<TextField hintText='Add new context'
						value={this.state.currentValue}
						onKeyDown={this.onInputKeyDown_}
						onChange={this.onInputChange_}
					/>
				</div>
				<RaisedButton label='Add' onClick={this.add_} />
				<ul>
				{this.state.contexts.map((item) => {
					return(
						<Item item={item} onClick={this.manageContext_} />
					);
				})}
				</ul>
			</section>
		);
	}

});

module.exports = Inbox;

