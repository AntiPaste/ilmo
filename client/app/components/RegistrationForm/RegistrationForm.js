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
    const data = {
      custom_fields: [],
    };

    this.props.event.fields.forEach((field) => {
      const customField = {};
      customField[field.key] = this.refs[field.key].getValue();

      data.custom_fields.push(customField);
    });

    this.props.registrationActionCreators.createRegistration(
      this.props.event.id,
      data,
    );
  },

  render() {
    if (!this.props.event) return this._emptyContent();
    return this._getContent();
  },
});

export default RegistrationForm;
