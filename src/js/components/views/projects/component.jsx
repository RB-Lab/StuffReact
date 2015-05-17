const React = require('react');
const {RaisedButton, TextField} = require('material-ui');
const Actions = require('./actions');
const KEYS = require('constants/key-codes');
const ProjectsStore = require('stores/projects-store');
const Item = require('components/ui/item/component.jsx');
const frameActions = require('components/frame/actions');
const PAGES = require('constants/pages').PAGES;

let Inbox = React.createClass({

	getInitialState(){
		return {
			currentValue: '',
			projects: ProjectsStore.getAll()
		};
	},

	componentDidMount() {
		ProjectsStore.addChangeListener(this.onItemsChange_);
	},

	componentWillUnmount() {
		ProjectsStore.removeChangeListener(this.onItemsChange_);
	},

	add_() {
		if(!this.state.currentValue) return;
		Actions.addProject(this.state.currentValue);
		this.setState({currentValue: ''});
	},

	onInputKeyDown_(e){
		if(e.keyCode === KEYS.ENTER) return this.add_();
	},

	onInputChange_(e){
		this.setState({currentValue: e.currentTarget.value});
	},

	onItemsChange_(){
		this.setState({projects: ProjectsStore.getAll()});
	},

	manageProject_(item){
		frameActions.changePage(PAGES.MANAGE_PROJECT, item);
	},

	render() {
		return (
			<section>
				<div>
					<TextField hintText='Add new project'
						value={this.state.currentValue}
						onKeyDown={this.onInputKeyDown_}
						onChange={this.onInputChange_}
					/>
				</div>
				<RaisedButton label='Add' onClick={this.add_} />
				<ul>
				{this.state.projects.map((item) => {
					return(
						<Item item={item} onClick={this.manageProject_} />
					);
				})}
				</ul>
			</section>
		);
	}

});

module.exports = Inbox;

