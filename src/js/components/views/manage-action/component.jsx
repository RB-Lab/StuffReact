const React = require('react');
const {RaisedButton, Checkbox} = require('material-ui');
const Actions = require('./actions');


let Ideas = React.createClass({

	getInitialState(){
		return {done: this.props.data.done};
	},

	done_(){
		// TODO make items immutable, move all operations to store
		Actions.setItemDoneStatus(this.props.data, !this.state.done);
		this.setState({done: !this.state.done});
	},

	schedule_(){
		console.log('schedule');
	},

	delegate_(){
		console.log('delegate');
	},

	render() {
		return (
			<section>
			<h4>What to do with {this.props.data.title}?</h4>
			<h5>If you can do it now less then for 2 minutes, then just do it</h5>
			<Checkbox checked={this.state.done} label='Done?' onCheck={this.done_}/>
			<h5>If you cannot do it now, then:</h5>
			<RaisedButton label='Schedule it' onClick={this.schedule_}/>
			<RaisedButton label='Delegate it' onClick={this.delegate_}/>
			</section>
		);
	}

});

module.exports = Ideas;

