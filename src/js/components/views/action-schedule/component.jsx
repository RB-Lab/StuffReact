const React = require('react');

let Ideas = React.createClass({

	render() {
		return (
			<section>
			<h4>Schedule &laquo;{this.props.data.get('title')}&raquo;?</h4>
			</section>
		);
	}

});

module.exports = Ideas;

