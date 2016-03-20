/**
 * ExampleView.js - React component ExampleView
 *
 * Copyright 2015 Taito United Oy
 * All rights reserved.
 */

import React from 'react';
import Breadcrumbs from '../Breadcrumbs';
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

  _getPath() {
    const path = [];
    path.push({ name: 'Etusivu', url: '/' });

    return path;
  },

  render() {
    return (
      <div className='container'>
        <Breadcrumbs path={this._getPath()} />
        <EventsList events={this.state.eventState.events} />
      </div>
    );
  },
});

export default EventsView;
