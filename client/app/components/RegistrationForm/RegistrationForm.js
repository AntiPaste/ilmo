import React from 'react';
import RegistrationField from '../RegistrationField';

const RegistrationForm = React.createClass({
  propTypes: {
    event: React.PropTypes.object,
    registrationActionCreators: React.PropTypes.object.isRequired,
  },

  _getContent() {
    return (
      <div>
        {this.props.event.fields.map((field) => {
          return (
            <RegistrationField
              key={field.key}
              ref={field.key}
              field={field}
            />
          );
        })}

        <br />

        <input
          type='button'
          value='Ilmoittaudu!'
          className='btn btn-primary'
          onClick={this.handleForm}
        />
      </div>
    );
  },

  _emptyContent() {
    return null;
  },

  handleForm() {
    let valid = true;
    const data = {
      custom_fields: {},
    };

    this.props.event.fields.forEach((field) => {
      const value = this.refs[field.key].getValue();
      const isRequired = this.refs[field.key].isRequired();
      const error = (isRequired && !value);

      if (error) valid = false;
      this.refs[field.key].setError(error);

      data.custom_fields[field.key] = value;
    });

    if (!valid) return;
    this.props.registrationActionCreators.createRegistration(
      this.props.event.id,
      data,
      {
        redirect: `/events/${this.props.event.id}`,
        messages: {
          success: 'Ilmoittautumisesi on kirjattu!',
          error: 'Ilmoittautumisen kirjaamisessa tapahtui virhe',
        },
      }
    );
  },

  render() {
    if (!this.props.event) return this._emptyContent();
    return this._getContent();
  },
});

export default RegistrationForm;
