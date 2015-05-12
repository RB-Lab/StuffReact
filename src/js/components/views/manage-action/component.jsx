const React = require('react');
const {RaisedButton, Checkbox} = require('material-ui');
const Actions = require('./actions');
const frameActions = require('components/frame/actions');
const PAGES = require('constants/pages').PAGES;


let ManageAction = React.createClass({

	getInitialState(){
		return {done: this.props.data.get('done')};
	},

	done_(){
		Actions.setItemDoneStatus(this.props.data, !this.state.done);
		this.setState({done: !this.state.done}); // TODO set state on storage update
	},

	schedule_(){
		frameActions.changePage(PAGES.ACTION_SCHEDULE, this.props.data);
	},

	delegate_(){
		frameActions.changePage(PAGES.ACTION_DELEGATE, this.props.data);
	},

	render() {
		return (
			<section>
			<h4>What to do with &laquo;{this.props.data.get('title')}&raquo;?</h4>
			<h5>If you can do it now less then for 2 minutes, then just do it</h5>
			<Checkbox checked={this.state.done} label='Done?' onCheck={this.done_}/>
			<h5>If you cannot do it now, then:</h5>
			<RaisedButton label='Schedule it' onClick={this.schedule_}/>
			<RaisedButton label='Delegate it' onClick={this.delegate_}/>
			</section>
		);
	}

});

module.exports = ManageAction;

