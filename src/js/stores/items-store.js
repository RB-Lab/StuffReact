const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../app-dispatcher');
const inboxConstants = require('../components/views/inbox/constants');

const CHANGE_EVENT = 'change';

function Item(title){
	'use strict';
	this.context = null;
	this.project = null;
	this.title = title;
	this.description = '';
}
Item.prototype.isInbox = function(){
	'use strict';
	return !(this.context &&this.project);
};


var items = [];

var ItemsStore = assign({}, EventEmitter.prototype, {

	// Allow Controller-View to register itself with store
	addChangeListener(callback) {
		'use strict';
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		'use strict';
		this.removeListener(CHANGE_EVENT, callback);
	},

	// triggers change listener above, firing controller-view callback
	emitChange() {
		'use strict';
		this.emit(CHANGE_EVENT);
	},

	getInbox(){
		'use strict';
		return items.filter((item) => {
			return item.isInbox();
		}).reverse();
	}

});

AppDispatcher.register(function(payload){
	'use strict';
	switch(payload.action.type){
		case inboxConstants.ADD_ITEM:
			items.push(new Item(payload.action.data.itemName));
			ItemsStore.emitChange();
			break;
	}
});

module.exports = ItemsStore;
