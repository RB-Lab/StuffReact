const Projcet = require('./project');

describe('Projcet model constructor', () => {
	it('should create project with string as the constructor argument', () => {
		const project = new Projcet('foo');
		expect(project).to.be.an.instanceof(Projcet);
		expect(project.title).to.equal('foo');
	});

	it('should create project with object as the constructor argument', () => {
		var mock = {
			title: 'foo',
			description: 'bar',
			parent: 'baz'
		};
		const project = new Projcet(mock);
		expect(project.id).to.be.a('string');
		expect(project.id.length).to.equal(5);
		expect(project.title).to.equal(mock.title);
		expect(project.description).to.equal(mock.description);
		expect(project.parent).to.equal(mock.parent);
	});
});

