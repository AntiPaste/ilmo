import React from 'react';
import classnames from 'classnames';

import Loading from '../Loading';
import EventCreateField from '../EventCreateField';

const EventCreateForm = React.createClass({
  propTypes: {
    createEventLoading: React.PropTypes.bool,
    eventActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      nameError: false,
      fields: ['event-field-0'],
    };
  },

  addField() {
    const fields = this.state.fields;
    fields.push(`event-field-${fields.length}`);

    this.setState({
      fields: fields,
    });
  },

  submitEvent() {
    const data = {
      name: this.refs.eventName.value,
      fields: [],
    };

    const state = this.state;

    let valid = true;
    data.fields = this.state.fields.map((key) => {
      const field = this.refs[key];
      if (!field.validate()) valid = false;

      return field.getData();
    });

    if (!data.name) {
      valid = false;
      state.nameError = true;
    } else {
      state.nameError = false;
    }

    this.setState(state);
    if (!valid) return;

    this.props.eventActionCreators.createEvent(
      data,
      {
        redirect: '/',
        messages: {
          success: 'Tapahtumasi on lisätty!',
          error: 'Tapahtuman lisäämisessä tapahtui virhe',
        },
      }
    );
  },

  changeName(event) {
    this.setState({
      name: event.target.value,
    });
  },

  removeField(id) {
    let fields = this.state.fields;
    fields = fields.filter((field) => {
      return field !== id;
    });

    this.setState({
      fields: fields,
    });
  },

  _getContent() {
    const nameGroupClasses = classnames(
      'form-group', {
        'has-danger': this.state.nameError,
      }
    );

    const nameFieldClasses = classnames(
      'form-control', {
        'form-control-danger': this.state.nameError,
      }
    );

    const nameTextClasses = classnames(
      'text-danger', {
        'hidden-xs-up': !this.state.nameError,
      }
    );

    return (
      <div className='event-create-form'>
        <div className='m-b-1'>
          <fieldset className={nameGroupClasses}>
            <label>Tapahtuman nimi</label>

            <input
              type='text'
              ref='eventName'
              className={nameFieldClasses}
            />

            <small className={nameTextClasses}>
              Nimi ei voi olla tyhjä.
            </small>
          </fieldset>

          {this.state.fields.map((field) => {
            const removeField = (
              field !== this.state.fields[0] ? this.removeField : null
            );

            return (
              <EventCreateField
                key={field}
                ref={field}
                id={field}
                removeField={removeField}
              />
            );
          })}

          <a
            href='#'
            className='form-add-field m-l-1 m-t-1'
            onClick={this.addField}
          >
            <i className='ion'></i>
          </a>
        </div>

        <div className='event-create-form-controls'>
          <button
            className='btn btn-success btn-loading m-r-1'
            onClick={this.submitEvent}
          >
            <Loading
              loading={this.props.createEventLoading}
              placeholder='Tallenna'
            />
          </button>

          <a href='/' className='btn btn-warning'>Peruuta</a>
        </div>
      </div>
    );
  },

  render() {
    return this._getContent();
  },
});

export default EventCreateForm;
