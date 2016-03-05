import React from 'react';
import EventDetails from '../EventDetails';

const EventView = React.createClass({
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
        <EventDetails event={this.state.eventState.event} />
      </div>
    );
  },
});

export default EventView;
