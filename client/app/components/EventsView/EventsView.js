/**
 * ExampleView.js - React component ExampleView
 *
 * Copyright 2015 Taito United Oy
 * All rights reserved.
 */

import React from 'react';
import EventsList from '../EventsList';

const EventsView = React.createClass({
  propTypes: {
    eventStore: React.PropTypes.object.isRequired,
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

  render() {
    return (
      <div className='container'>
        <EventsList events={this.state.eventState.events} />
      </div>
    );
  },
});

export default EventsView;
