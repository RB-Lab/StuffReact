const Item = require('./item');
const TYPES = require('constants/item-types');

describe('Item model constructor', () => {
	it('should create item with string as the constructor argument', () => {
		const item = new Item('foo');
		expect(item).to.be.an.instanceof(Item);
		expect(item.title).to.equal('foo');
	});

	it('should create item with object as the constructor argument', () => {
		var mock = {
			type: 'foo',
			context: 'bar',
			porject: 'baz',
			title: 'zab',
			description: 'rab',
			done: true
		};
		const item = new Item(mock);
		expect(item.id).to.be.a('string');
		expect(item.id.length).to.equal(5);
		expect(item.type).to.equal(mock.type);
		expect(item.context).to.equal(mock.context);
		expect(item.poject).to.equal(mock.poject);
		expect(item.title).to.equal(mock.title);
		expect(item.description).to.equal(mock.description);
		expect(item.done).to.equal(mock.done);
	});
});

describe('IsInbox', () => {

	it('should use immutable map inteface', () => {
		const mockItem = {
			get: sinon.spy()
		};

		Item.isInbox(mockItem);
		expect(mockItem.get.called).to.equal(true);
	});

	it('should check context', () => {
		const mockItem = {
			get: sinon.spy()
		};

		Item.isInbox(mockItem);
		expect(mockItem.get.calledWith('context')).to.equal(true);
	});

	it('should check project', () => {
		const mockItem = {
			get: sinon.spy()
		};

		Item.isInbox(mockItem);
		expect(mockItem.get.calledWith('context')).to.equal(true);

	});

	it('should check project and context together', () => {
		const mockItem = {get(){}};
		let fields = {
			context: '',
			project: ''
		};
		sinon.stub(mockItem, 'get', function(field){
			return fields[field];
		});

		expect(Item.isInbox(mockItem)).to.equal(true);
		fields.context = 'foo';
		expect(Item.isInbox(mockItem)).to.equal(true);
		fields.project = 'foo';
		expect(Item.isInbox(mockItem)).to.equal(false);
		fields.context = '';
		expect(Item.isInbox(mockItem)).to.equal(true);
	});

	it('should check done', () => {
		const mockItem = {get(){}};
		let fields = {
			done: false
		};
		sinon.stub(mockItem, 'get', function(field){
			return fields[field];
		});

		Item.isInbox(mockItem);
		expect(mockItem.get.calledWith('done')).to.equal(true);
		expect(Item.isInbox(mockItem)).to.equal(true);
		fields.done = true;
		expect(Item.isInbox(mockItem)).to.equal(false);

	});

	it('should check type', () => {
		const mockItem = {get(){}};
		let fields = {
			type: 'any'
		};
		sinon.stub(mockItem, 'get', function(field){
			return fields[field];
		});

		Item.isInbox(mockItem);
		expect(mockItem.get.calledWith('type')).to.equal(true);
		expect(Item.isInbox(mockItem)).to.equal(true);
		fields.type = TYPES.TYPE_IDEA;
		expect(Item.isInbox(mockItem)).to.equal(false);

	});

});
