import React from 'react';
import Messages from '../Messages';
import Breadcrumbs from '../Breadcrumbs';
import RegistrationDetails from '../RegistrationDetails';
import RegistrationForm from '../RegistrationForm';

const RegistrationView = React.createClass({
  propTypes: {
    messageStore: React.PropTypes.object.isRequired,
    eventStore: React.PropTypes.object.isRequired,
    messageActionCreators: React.PropTypes.object.isRequired,
    registrationActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return this._getStoreData();
  },

  componentDidMount() {
    this._eventStoreSubscription = this.props.eventStore.addListener(
      this._onStoreChange
    );
  },

  componentWillUnmount() {
    this._eventStoreSubscription.remove();
  },

  _onStoreChange() {
    this.setState(this._getStoreData());
  },

  _getStoreData() {
    return {
      eventState: this.props.eventStore.getState(),
    };
  },

  _getPath() {
    const path = [];
    const event = this.state.eventState.event || {};

    /* eslint-disable max-len */
    path.push({ name: 'Etusivu', url: '/' });
    path.push({ name: event.name, url: `/events/${event.id}` });
    path.push({ name: 'Ilmoittautuminen', url: `/events/${event.id}/register` });
    /* eslint-enable max-len */

    return path;
  },

  render() {
    return (
      <div className='container'>
        <Messages
          messageActionCreators={this.props.messageActionCreators}
          messageStore={this.props.messageStore}
        />

        <Breadcrumbs path={this._getPath()} />
        <RegistrationDetails event={this.state.eventState.event} />
        <RegistrationForm
          event={this.state.eventState.event}
          registrationActionCreators={this.props.registrationActionCreators}
        />
      </div>
    );
  },
});

export default RegistrationView;
