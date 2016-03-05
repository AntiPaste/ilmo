import CommonActionCreators from './CommonActionCreators';
import ActionTypes from './ActionTypes';
// import ErrorTypes from '../../shared/ErrorTypes';

// import { defineMessages } from 'react-intl';

class EventActionCreators extends CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    super(dispatcher, apiUtils);
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
}

export default EventActionCreators;
