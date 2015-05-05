const React = require('react');
const {RaisedButton} = require('material-ui');


let Ideas = React.createClass({

	done_(){
		console.log('done');
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
			<RaisedButton label='Done?' onClick={this.done_}/>
			<h5>If you cannot do it now, then:</h5>
			<RaisedButton label='Schedule it' onClick={this.schedule_}/>
			<RaisedButton label='Delegate it' onClick={this.delegate_}/>
			</section>
		);
	}

});

module.exports = Ideas;

