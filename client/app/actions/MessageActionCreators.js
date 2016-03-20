import CommonActionCreators from './CommonActionCreators';
import ActionTypes from './ActionTypes';

class MessageActionCreators extends CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    super(dispatcher, apiUtils);
  }

  addMessage(message) {
    console.log(message);
    this._dispatcher.dispatch({
      type: ActionTypes.MESSAGES_ADD,
      message: message,
    });
  }

  addFutureMessage(message) {
    message.future = true;
    this.addMessage(message);
  }

  expireMessage(id) {
    this._dispatcher.dispatch({
      type: ActionTypes.MESSAGES_EXPIRE,
      id: id,
    });
  }

  clearMessages() {
    this._dispatcher.dispatch({
      type: ActionTypes.MESSAGES_CLEAR,
    });
  }
}

export default MessageActionCreators;
