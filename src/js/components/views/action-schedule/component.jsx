const React = require('react');
const {FlatButton, Dialog} = require('material-ui');
const Item = require('components/ui/item/component.jsx');
const {Map} = require('immutable');

let contexts = [{title: 'context-1'}, {title: 'context-2'}, {title: 'context-3'}];
let projects = [{title: 'project-1'}, {title: 'project-2'}, {title: 'project-3'}];

contexts = contexts.map((item) => {return new Map(item);});
projects = projects.map((item) => {return new Map(item);});

let ActionSchedule = React.createClass({


	selectContext_(){
		this.refs.contextDialog.show();
	},

	selectProject_(){
		this.refs.projectDialog.show();
	},

	setContext_(){
		this.refs.contextDialog.dismiss();
	},

	setProject_(){
		this.refs.projectDialog.dismiss();
	},

	get_(what){
		return this.props.data.get(what) || '...';
	},

	render() {
		return (
			<section>
			<h4>Schedule &laquo;{this.props.data.get('title')}&raquo;?</h4>
			<h6>Context:</h6>
			<FlatButton label={this.get_('context')} onClick={this.selectContext_}/>
			<Dialog ref='contextDialog' title='Select context' modal={true}>
				{contexts.map((item) => {
					return(
						<Item item={item} onClick={this.setContext_} />
					);
				})}
			</Dialog>

			<h6>Project:</h6>
			<FlatButton label={this.get_('project')}  onClick={this.selectProject_}/>
			<Dialog ref='projectDialog' title='Select project' modal={true}>
				{projects.map((item) => {
					return(
						<Item item={item} onClick={this.setProject_} />
					);
				})}
			</Dialog>
			</section>
		);
	}

});

module.exports = ActionSchedule;

