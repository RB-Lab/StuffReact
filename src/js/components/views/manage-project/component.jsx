const React = require('react');
const {TextField} = require('material-ui');
const Actions = require('./actions');
const ProjectsStore = require('stores/projects-store');
const ItemsStore = require('stores/items-store');
const Item = require('components/ui/item/component.jsx');
const frameActions = require('components/frame/actions');
const ITEM_TYPE_TO_PAGE_MAP = require('constants/pages').ITEM_TYPE_TO_PAGE_MAP;

let Inbox = React.createClass({

	getInitialState(){
		return {
			currentTitleValue: this.props.data.get('title'),
			currentDescriptionValue: this.props.data.get('description'),
			items: ItemsStore.getAllByProjectId(this.props.data.get('id')),
			project: this.props.data
		};
	},

	componentDidMount() {
		ProjectsStore.addChangeListener(this.onProjectChange_);
	},

	componentWillUnmount() {
		ProjectsStore.removeChangeListener(this.onProjectChange_);
	},

	onProjectChange_(){
		let project = ProjectsStore.getById(this.state.project.get('id'));
		this.setState({
			currentTitleValue: project.get('title'),
			currentDescriptionValue: project.get('description'),
			project
		});
	},

	onTitileChange_(e){
		Actions.changeProject(this.state.project, 'title', e.currentTarget.value);
	},

	onDescriptionChange_(e){
		Actions.changeProject(this.state.project, 'description', e.currentTarget.value);
	},

	manageItem_(item){
		frameActions.changePage(ITEM_TYPE_TO_PAGE_MAP[item.get('type')], item);
	},

	render() {
		return (
			<section>
				<div>
					<TextField hintText='Prject title'
						value={this.state.currentTitleValue}
						onChange={this.onTitileChange_}
					/>
				</div>
				<div>
					<TextField floatingLabelText='Prject description'
						value={this.state.currentDescriptionValue}
						onChange={this.onDescriptionChange_}
						multiLine={true}
					/>
				</div>
				<ul>
				{this.state.items.map((item) => {
					return(
						<Item item={item} onClick={this.manageItem_} />
					);
				})}
				</ul>
			</section>
		);
	}

});

module.exports = Inbox;

