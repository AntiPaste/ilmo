import React from 'react';
import classnames from 'classnames';

const EventCreateField = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    removeField: React.PropTypes.func,
  },

  getInitialState() {
    return {
      type: '',
      typeError: false,
      label: '',
      labelError: false,
      choices: [],
      choicesError: false,
      optional: true,
      public: true,
    };
  },

  getData() {
    return this.state;
  },

  validate() {
    const state = this.state;
    let valid = true;

    if (!state.type) {
      state.typeError = true;
      valid = false;
    } else {
      state.typeError = false;
    }

    if (!state.label) {
      state.labelError = true;
      valid = false;
    } else {
      state.labelError = false;
    }

    const needsChoices = ['select', 'radio'].indexOf(state.type) !== -1;
    if (needsChoices && !state.choices.length) {
      state.choicesError = true;
      valid = false;
    } else {
      state.choicesError = false;
    }

    this.setState(state);
    return valid;
  },

  changeType(event) {
    let value = event.target.value;
    if (value === 'SELECT_PLACEHOLDER') value = '';

    this.setState({
      type: value,
    });
  },

  changeLabel(event) {
    this.setState({
      label: event.target.value,
    });
  },

  changeChoices(event) {
    const choices = event.target.value.replace('\r', '').split('\n');
    this.setState({
      choices: choices,
    });
  },

  changeOptional(event) {
    this.setState({
      optional: !event.target.checked,
    });
  },

  changePrivate(event) {
    this.setState({
      public: !event.target.checked,
    });
  },

  _getContent() {
    const typeGroupClasses = classnames(
      'form-group', 'm-r-1', {
        'has-danger': this.state.typeError,
      }
    );

    const typeFieldClasses = classnames(
      'form-control', {
        'form-control-danger': this.state.typeError,
      }
    );

    const typeTextClasses = classnames(
      'block', 'text-danger', {
        'hidden-xs-up': !this.state.typeError,
      }
    );

    const labelGroupClasses = classnames(
      'form-group', 'm-r-1', {
        'has-danger': this.state.labelError,
      }
    );

    const labelFieldClasses = classnames(
      'form-control', {
        'form-control-danger': this.state.labelError,
      }
    );

    const labelTextClasses = classnames(
      'block', 'text-danger', {
        'hidden-xs-up': !this.state.labelError,
      }
    );

    const choicesGroupClasses = classnames(
      'form-group', 'm-r-1', {
        'has-danger': this.state.choicesError,
      }
    );

    const choicesFieldClasses = classnames(
      'form-control', {
        'form-control-danger': this.state.choicesError,
      }
    );

    const choicesTextClasses = classnames(
      'block', 'text-danger', {
        'hidden-xs-up': !this.state.choicesError,
      }
    );

    return (
      <form className='form form-inline m-b-1'>
        <fieldset className={typeGroupClasses}>
          <select
            className={typeFieldClasses}
            defaultValue='SELECT_PLACEHOLDER'
            onChange={this.changeType}
          >
            <option
              disabled
              value='SELECT_PLACEHOLDER'
            >
              Valitse kentän tyyppi
            </option>

            <option value='text'>Tekstikenttä</option>
            <option value='radio'>Monivalinta</option>
            <option value='select'>Pudotusvalikko</option>
          </select>

          <small className={typeTextClasses}>
            Sinun on valittava tyyppi kentälle.
          </small>
        </fieldset>

        <fieldset className={labelGroupClasses}>
          <input
            type='text'
            className={labelFieldClasses}
            placeholder='Kentän nimi'
            onChange={this.changeLabel}
          />

          <small className={labelTextClasses}>
            Nimi ei voi olla tyhjä.
          </small>
        </fieldset>

        {['select', 'radio'].indexOf(this.state.type) !== -1 ?
          <fieldset className={choicesGroupClasses}>
            <textarea
              className={choicesFieldClasses}
              onChange={this.changeChoices}
            ></textarea>

            <small className={choicesTextClasses}>
              Tarvitset vähintään yhden vaihtoehdon.
            </small>
          </fieldset> : null
        }

        <label className='checkbox-inline'>
          <input
            type='checkbox'
            onChange={this.changeOptional}
          /> Pakollinen
        </label>

        <label className='checkbox-inline m-r-1'>
          <input
            type='checkbox'
            onChange={this.changePrivate}
          /> Yksityinen
        </label>

        {this.props.removeField ?
          <a
            href='#'
            className='form-remove-field m-l-1'
            onClick={this.props.removeField.bind(null, this.props.id)}
          >
            <i className='ion'></i>
          </a> : null
        }
      </form>
    );
  },

  render() {
    return this._getContent();
  },
});

export default EventCreateField;
