const React = require('react');
const {RaisedButton} = require('material-ui');
const ITEM_TYPES = require('constants/item-types');
const Actions = require('./actions');

let TypeSelector = React.createClass({

	setAsAction_(){
		Actions.setItemType(this.props.data, ITEM_TYPES.TYPE_ACTION);
	},
	setAsIdea_(){
		Actions.setItemType(this.props.data, ITEM_TYPES.TYPE_IDEA);
	},
	setAsRefernce_(){
		Actions.setItemType(this.props.data, ITEM_TYPES.TYPE_REFERENCE);
	},

	render() {
		return (
			<section>
				<h2>What &laquo;{this.props.data.get('title')}&raquo; is?</h2>
				<RaisedButton label='This is action' onClick={this.setAsAction_} />
				<br/>
				<RaisedButton label='This is idea' onClick={this.setAsIdea_} />
				<br/>
				<RaisedButton label='This is reference' onClick={this.setAsRefernce_} />
				<br/>
			</section>
		);
	}

});

module.exports = TypeSelector;

