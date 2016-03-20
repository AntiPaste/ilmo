import { Store } from 'flux/utils';
import ActionTypes from '../actions/ActionTypes';

class MessageStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);

    this._state = {
      messages: {},
      nextMessageID: 1,
    };
  }

  getState() {
    return this._state;
  }

  __onDispatch(payload) {
    switch (payload.type) {
    case ActionTypes.MESSAGES_ADD:
      const messageID = this._state.nextMessageID;
      this._state.messages[messageID] = payload.message;
      this._state.nextMessageID++;
      this.__emitChange();
      break;
    case ActionTypes.MESSAGES_CLEAR:
      this.clearMessages();
      this.__emitChange();
      break;
    case ActionTypes.MESSAGES_EXPIRE:
      this.clearMessage(payload.id);
      this.__emitChange();
      break;
    default:
      // Ignoring other ActionTypes
    }
  }

  clearMessage(id) {
    const newMessages = {};
    const messages = this._state.messages;

    Object.keys(messages).forEach((key) => {
      if (key !== id) newMessages[key] = messages[key];
    });

    this._state.messages = newMessages;
  }

  clearMessages() {
    const newMessages = {};
    const messages = this._state.messages;

    Object.keys(messages).forEach((key) => {
      const message = messages[key];
      if (!message.future) return;

      message.future = false;
      newMessages[key] = message;
    });

    this._state.messages = newMessages;
  }
}

export default MessageStore;
