import React from 'react';

const RegistrationDetails = React.createClass({
  propTypes: {
    event: React.PropTypes.object,
  },

  _getContent() {
    return (
      <div className='registration-details'>
        <div>Ilmoittautuminen tapahtumaan: {this.props.event.name}</div>
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

export default RegistrationDetails;
