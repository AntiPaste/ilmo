import React from 'react';

const RegistrationList = React.createClass({
  propTypes: {
    event: React.PropTypes.object,
    registrations: React.PropTypes.array.isRequired,
  },

  _getTableHeading() {
    return (
      <thead>
        <tr>
          {this.props.event.fields.map((field) => {
            return <th key={field.key}>{field.label}</th>;
          })}
        </tr>
      </thead>
    );
  },

  _getTableContent() {
    const registrations = this.props.registrations;
    const event = this.props.event;

    if (!registrations.length) {
      return (
        <tbody>
          <tr>
            <td rowSpan={event.fields.length}>
              <span>Ei ilmoittautuneita. </span>
              <a href={`/events/${event.id}/register`}>Ole ensimmäinen!</a>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {registrations.map((registration) => {
          return (
            <tr key={registration.id}>
              {event.fields.map((field) => {
                return (
                  <td key={field.key}>
                    {registration.custom_fields[field.label]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },

  _getContent() {
    return (
      <div>
        <table className='table'>
          {this._getTableHeading()}
          {this._getTableContent()}
        </table>
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

export default RegistrationList;
