import React from 'react';

const EventsList = React.createClass({
  propTypes: {
    events: React.PropTypes.array,
  },

  _getContent() {
    return (
      <div className='event-list'>
        {this.props.events.map((event) => {
          return (
            <a
              key={event.id}
              className='event-list-item'
              href={`/events/${event.id}`}
            >
              {event.name}
            </a>
          );
        })}
      </div>
    );
  },

  _emptyContent() {
    return null;
  },

  render() {
    if (!this.props.events) return this._emptyContent();
    return this._getContent();
  },
});

export default EventsList;
