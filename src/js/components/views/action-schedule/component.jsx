const React = require('react');

let ActionSchedule = React.createClass({

	render() {
		return (
			<section>
			<h4>Schedule &laquo;{this.props.data.get('title')}&raquo;?</h4>
			</section>
		);
	}

});

module.exports = ActionSchedule;

