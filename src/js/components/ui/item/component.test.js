const Item = require('./component.jsx');
const React = require('react');
const TestUtils = require('react/addons').addons.TestUtils;

const mockItem = {
	get(){}
};

const onClickSpy = sinon.spy();

describe("Testing item component", () => {
	it("should call onClick handler with item as a first argument on click", () => {
		const item = TestUtils.renderIntoDocument(<Item onClick={onClickSpy} item={mockItem}/>);
		TestUtils.Simulate.click(item.getDOMNode());
		expect(onClickSpy.calledOnce).to.equal(true);
		expect(onClickSpy.firstCall.args[0]).to.equal(mockItem);
	});
});
