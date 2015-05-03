const React = require('react');

let Contexts = React.createClass({

	onClick_(){
		this.props.onClick(this.props.item);
	},

	render() {
		return (
			<li onClick={this.onClick_} className='item'>{this.props.item.title}</li>
		);
	}

});

module.exports = Contexts;

