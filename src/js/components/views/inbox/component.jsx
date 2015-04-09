const React = require('react');
const {RaisedButton, TextField} = require('material-ui');

let Inbox = React.createClass({
	render() {
		'use strict';
		return (
			<section>
				<div>
					<TextField hintText='Add new item' />
				</div>
				<RaisedButton label='Add' />&nbsp;
				<RaisedButton label='Add and manage' />
			</section>
		);
	}

});

module.exports = Inbox;

