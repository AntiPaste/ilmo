import React from 'react';
import Messages from '../Messages';
import Breadcrumbs from '../Breadcrumbs';
import EventDetails from '../EventDetails';
import RegistrationList from '../RegistrationList';

const EventView = React.createClass({
  propTypes: {
    eventID: React.PropTypes.string.isRequired,
    messageStore: React.PropTypes.object.isRequired,
    eventStore: React.PropTypes.object.isRequired,
    registrationStore: React.PropTypes.object.isRequired,
    messageActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return this._getStoreData();
  },

  componentDidMount() {
    this._eventStoreSubscription = this.props.eventStore.addListener(
      this._onStoreChange
    );

    this._registrationStoreSubscription =
      this.props.registrationStore.addListener(
        this._onStoreChange
      );
  },

  componentWillUnmount() {
    this._eventStoreSubscription.remove();
    this._registrationStoreSubscription.remove();
  },

  _onStoreChange() {
    this.setState(this._getStoreData());
  },

  _getStoreData() {
    return {
      eventState: this.props.eventStore.getState(),
      registrationState: this.props.registrationStore.getState(),
    };
  },

  _getPath() {
    const path = [];
    const event = this.state.eventState.event || {};

    path.push({ name: 'Etusivu', url: '/' });
    path.push({ name: event.name, url: `/events/${event.id}` });

    return path;
  },

  render() {
    const eventID = this.props.eventID;
    const registrationState = this.state.registrationState;

    const event = this.state.eventState.event;
    const registrations = registrationState.registrations[eventID] || [];

    return (
      <div className='container'>
        <Messages
          messageActionCreators={this.props.messageActionCreators}
          messageStore={this.props.messageStore}
        />

        <Breadcrumbs path={this._getPath()} />
        <EventDetails event={event} />
        <RegistrationList event={event} registrations={registrations} />
      </div>
    );
  },
});

export default EventView;
