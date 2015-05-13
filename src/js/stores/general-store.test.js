const generalStore = require('./general-store')


describe('items store test', ()=>{

	it('should be able to emit change',()=>{
		console.log(Object.keys(generalStore));
		expect(generalStore.emitChange).to.be.a('function');
	});

	it('should add change listener',()=>{
		let listener = sinon.spy();
		generalStore.addChangeListener(listener);
		generalStore.emitChange();
		expect(listener.calledOnce).to.equal(true);
	});

	it('should rempove change listener',()=>{
		let listener = sinon.spy();
		generalStore.addChangeListener(listener);
		generalStore.emitChange();
		generalStore.removeChangeListener(listener);
		generalStore.emitChange();
		expect(listener.calledOnce).to.equal(true);
	});

});
