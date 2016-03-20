import { Store } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

class RegistrationStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);

    this._state = this.getInitialState();
  }

  getInitialState() {
    return {
      registrations: {},
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
    case ActionTypes.REGISTRATIONS_RECEIVE:
      this._state.registrations[payload.eventID] = payload.registrations;
      this.__emitChange();
      break;
    default:
      // Ignoring other ActionTypes
    }
  }
}

export default RegistrationStore;
