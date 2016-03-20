import React from 'react';
import Messages from '../Messages';
import Breadcrumbs from '../Breadcrumbs';
import EventCreateForm from '../EventCreateForm';

const EventCreateView = React.createClass({
  propTypes: {
    eventStore: React.PropTypes.object.isRequired,
    eventActionCreators: React.PropTypes.object.isRequired,
    messageStore: React.PropTypes.object.isRequired,
    messageActionCreators: React.PropTypes.object.isRequired,
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

    path.push({ name: 'Etusivu', url: '/' });
    path.push({ name: 'Lisää tapahtuma', url: '/events/create' });

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
        <EventCreateForm
          createEventLoading={this.state.eventState.createEventLoading}
          eventActionCreators={this.props.eventActionCreators}
        />
      </div>
    );
  },
});

export default EventCreateView;
