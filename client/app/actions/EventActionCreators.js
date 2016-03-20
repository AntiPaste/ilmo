import CommonActionCreators from './CommonActionCreators';
import MessageActionCreators from './MessageActionCreators';
import ActionTypes from './ActionTypes';
import 'bluebird';

class EventActionCreators extends CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    super(dispatcher, apiUtils);

    this.messageActionCreators = new MessageActionCreators(
      dispatcher,
      apiUtils
    );
  }

  getEvents() {
    this._apiUtils.get('/events')
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.EVENTS_RECEIVE,
          events: response.body.events,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getEvent(id) {
    this._apiUtils.get(`/events/${id}`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.EVENT_RECEIVE,
          event: response.body.event,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createEvent(data, extra) {
    this._dispatcher.dispatch({
      type: ActionTypes.CREATE_EVENT_LOADING,
      loading: true,
    });

    this._apiUtils.post('/events', data)
      .then((response) => {
        console.log(response);
        this.messageActionCreators.addFutureMessage({
          type: 'success',
          content: extra.messages.success,
        });

        this.redirect(extra.redirect);
      })
      .catch((error) => {
        console.error(error.popsicle.response.body.errors);
        this.messageActionCreators.addMessage({
          type: 'danger',
          content: extra.messages.error,
        });
      })
      .finally(() => {
        this._dispatcher.dispatch({
          type: ActionTypes.CREATE_EVENT_LOADING,
          loading: false,
        });
      });
  }
}

export default EventActionCreators;
