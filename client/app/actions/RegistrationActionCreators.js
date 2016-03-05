import CommonActionCreators from './CommonActionCreators';
// import ActionTypes from './ActionTypes';

class RegistrationActionCreators extends CommonActionCreators {
  constructor(dispatcher, apiUtils) {
    super(dispatcher, apiUtils);
  }

  createRegistration(eventID, registration) {
    const data = {
      event_id: eventID,
      ...registration,
    };

    this._apiUtils.post(`/registrations`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default RegistrationActionCreators;
