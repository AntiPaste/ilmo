import React from 'react';

const EventDetails = React.createClass({
  propTypes: {
    event: React.PropTypes.object,
  },

  _getContent() {
    return (
      <div className='event-details'>
        <div>Nimi: {this.props.event.name}</div>
        <a href={`/events/${this.props.event.id}/register`}>Ilmoittaudu</a>
      </div>
    );
  },

  _emptyContent() {
    return null;
  },

  render() {
    if (!this.props.event) return this._emptyContent();
    return this._getContent();
  },
});

export default EventDetails;
