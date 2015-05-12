const React = require('react');

let Item = React.createClass({

	onClick_(){
		this.props.onClick(this.props.item);
	},

	render() {
		return (
			<li onClick={this.onClick_} className='item'>{this.props.item.get('title')}</li>
		);
	}

});

module.exports = Item;

