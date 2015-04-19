const React = require('react');
const {RaisedButton} = require('material-ui');
const ItemsStore = require('stores/items-store');
const ITEM_TYPES = require('constants/item-types');

let TypeSelector = React.createClass({

	getInitialState(){
		return {
			item: this.props.data
		};
	},

	_setAsAction(){
		console.log(ITEM_TYPES.TYPE_ACTION);
	},
	_setAsIdea(){
		console.log(ITEM_TYPES.TYPE_IDEA);
	},
	_setAsRefernce(){
		console.log(ITEM_TYPES.TYPE_REFERENCE);
	},

	componentDidMount() {
		//ItemsStore.addChangeListener(this._onItemsChange);
	},

	componentWillUnmount() {
		//ItemsStore.removeChangeListener(this._onItemsChange);
	},

	render() {
		return (
			<section>
				<h2>What &laquo;{this.state.item.title}&raquo; is?</h2>
				<RaisedButton label='This is action' onClick={this._setAsAction} />
				<br/>
				<RaisedButton label='This is idea' onClick={this._setAsIdea} />
				<br/>
				<RaisedButton label='This is reference' onClick={this._setAsRefernce} />
				<br/>
			</section>
		);
	}

});

module.exports = TypeSelector;

