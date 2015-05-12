const React = require('react');


let ActionDelegate = React.createClass({

	render() {
		return (
			<section>
			<h4>Delegate &laquo;{this.props.data.get('title')}&raquo;?</h4>
			</section>
		);
	}

});

module.exports = ActionDelegate;

