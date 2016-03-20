import CommonActionCreators from './CommonActionCreators';
import MessageActionCreators from './MessageActionCreators';
import ActionTypes from './ActionTypes';

class RegistrationActionCreators extends CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    super(dispatcher, apiUtils);

    this.messageActionCreators = new MessageActionCreators(
      dispatcher,
      apiUtils
    );
  }

  getEventRegistrations(eventID) {
    this._apiUtils.get(`/events/${eventID}/registrations`)
      .then((response) => {
        this._dispatcher.dispatch({
          type: ActionTypes.REGISTRATIONS_RECEIVE,
          eventID: eventID,
          registrations: response.body.registrations,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createRegistration(eventID, registration, extra) {
    const data = {
      event_id: eventID,
      ...registration,
    };

    this._apiUtils.post(`/registrations`, data)
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
      });
  }
}

export default RegistrationActionCreators;
