const assign = require('object-assign');
const EventEmitter = require('events').EventEmitter;
const AppDispatcher = require('../../app-dispatcher');
const MainMenuContsatnts = require('../main-menu/constants');

const CHANGE_EVENT = 'change';

var frameState = {
	currentView: 'inbox'
};

var FrameStore = assign({}, EventEmitter.prototype, {

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

	getState() {
		'use strict';
		return frameState;
	}
});

AppDispatcher.register(function(payload){
	'use strict';
	switch(payload.action.type){
		case MainMenuContsatnts.CHANGE_PAGE:
			frameState.currentView = payload.action.data.page;
			FrameStore.emitChange();
			break;
	}
});

module.exports = FrameStore;
