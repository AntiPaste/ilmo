import { Store } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

class EventStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      events: null,
      event: null,
    };
  }

  getState() {
    return this._state;
  }

  clearState() {
    this._state = this.getInitialState();
  }

  __onDispatch(payload) {
    switch (payload.type) {
    case ActionTypes.EVENTS_RECEIVE:
      this._state.events = payload.events;
      this.__emitChange();
      break;
    case ActionTypes.EVENT_RECEIVE:
      this._state.event = payload.event;
      this.__emitChange();
      break;
    default:
      // Ignoring other ActionTypes
    }
  }
}

export default EventStore;
