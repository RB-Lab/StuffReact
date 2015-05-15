const Context = require('./context');

describe('Context model constructor', () => {
	it('should create context with string as the constructor argument', () => {
		const context = new Context('foo');
		expect(context).to.be.an.instanceof(Context);
		expect(context.title).to.equal('foo');
	});

	it('should create context with object as the constructor argument', () => {
		var mock = {
			title: 'foo',
			description: 'bar'
		};
		const context = new Context(mock);
		expect(context.id).to.be.a('string');
		expect(context.id.length).to.equal(5);
		expect(context.title).to.equal(mock.title);
		expect(context.description).to.equal(mock.description);
	});
});

