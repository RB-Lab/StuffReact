const React = require('react');
const {FlatButton, Dialog} = require('material-ui');
const Actions = require('./actions');
const Item = require('components/ui/item/component.jsx');
const ItemsStore = require('stores/items-store');
const ContextsStore = require('stores/contexts-store');
const ProjectsStore = require('stores/projects-store');

const contexts = ContextsStore.getAll();
const projects = ProjectsStore.getAll();
const storeMap = {
	'context': ContextsStore,
	'project': ProjectsStore
};

let ActionSchedule = React.createClass({

	getInitialState(){
		return {item: this.props.data};
	},

	componentDidMount() {
		ItemsStore.addChangeListener(this.onItemsChange_);
	},

	componentWillUnmount() {
		ItemsStore.removeChangeListener(this.onItemsChange_);
	},

	onItemsChange_(){
		this.setState({item: ItemsStore.getById(this.props.data.get('id'))});
	},

	selectContext_(){
		this.refs.contextDialog.show();
	},

	selectProject_(){
		this.refs.projectDialog.show();
	},

	setContext_(context){
		Actions.setContext(this.state.item, context.get('id'));
		this.refs.contextDialog.dismiss();
	},

	setProject_(project){
		Actions.setProject(this.state.item, project.get('id'));
		this.refs.projectDialog.dismiss();
	},

	getTitle_(what){
		const id = this.state.item.get(what);
		if(!id) return '...';
		const item = storeMap[what].getById(id);
		return item ? item.get('title') : '...';
	},

	render() {
		return (
			<section>
			<h4>Schedule &laquo;{this.state.item.get('title')}&raquo;?</h4>
			<h6>Context:</h6>
			<FlatButton label={this.getTitle_('context')} onClick={this.selectContext_}/>
			<Dialog ref='contextDialog' title='Select context' modal={true}>
				{contexts.map((item) => {
					return(
						<Item item={item} onClick={this.setContext_} />
					);
				})}
			</Dialog>

			<h6>Project:</h6>
			<FlatButton label={this.getTitle_('project')}  onClick={this.selectProject_}/>
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

