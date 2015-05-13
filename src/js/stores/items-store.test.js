let AppDispatcher;
let itemsSotre;
let callback; // here we'll put the callback that itemStore registers

const Constants = require('constants/app-constants');
const InboxConstants = require('components/views/inbox/constants');

function createActionAddItem(itemName){
	return {
		source: Constants.ActionSources.VIEW_ACTION,
		action: {
			type: InboxConstants.ADD_ITEM,
			data: {
				itemName: itemName
			}
		}
	};
}

function createActionSetItem(oldItem, newItem){
	return {
		source: Constants.ActionSources.VIEW_ACTION,
		action: {
			type: InboxConstants.ADD_ITEM,
			data: {
				oldItem: oldItem,
				newItem: newItem
			}
		}
	};
}


describe('items store test', ()=>{

	before(()=>{
		AppDispatcher = require('app-dispatcher');
		sinon.spy(AppDispatcher, 'register');
		itemsSotre = require('./items-store');
		callback = AppDispatcher.register.firstCall.args[0];
	});

	after(()=>{
		AppDispatcher.register.restore();
	});

	it('should get all items',()=>{
		expect(itemsSotre.getAll).to.be.a('function');
		expect(itemsSotre.getAll()).to.be.an('array');
		expect(itemsSotre.getAll().length).to.equal(0);
	});

	// TODO implement all tests

	it('should fill iteself from storage',()=>{

	});

	it('register callback in dispatcher',()=>{
		expect(AppDispatcher.register.callCount).to.equal(1);
	});

	it('should add item',()=>{

	});

	it('should add item as immutable map of Item instance',()=>{

	});

	it('should set item',()=>{

	});

	it('should get last added item',()=>{

	});

	it('should get all items filtered by isInbox',()=>{

	});

	it('should reverse ibox',()=>{

	});

});
