import React from 'react';
import classnames from 'classnames';

const RegistrationField = React.createClass({
  propTypes: {
    field: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      radioSelection: null,
      error: false,
    };
  },

  getValue() {
    if (this.props.field.type === 'radio') {
      return this.state.radioSelection;
    } else if (this.props.field.type === 'select') {
      if (this.refs.input.value === 'SELECT_PLACEHOLDER') {
        return null;
      }
    }

    return this.refs.input.value;
  },

  setError(error) {
    this.setState({
      error: error,
    });
  },

  isRequired() {
    return !this.props.field.optional;
  },

  renderText() {
    const groupClasses = classnames(
      'form-group', {
        'has-danger': this.state.error,
      }
    );

    const fieldClasses = classnames(
      'form-control', {
        'form-control-danger': this.state.error,
      }
    );

    const textClasses = classnames(
      'text-danger', {
        'hidden-xs-up': !this.state.error,
      }
    );

    return (
      <fieldset className={groupClasses}>
        <label>
          {this.props.field.optional ? '' : '*'} {this.props.field.label}
        </label>

        <input
          ref='input'
          type='text'
          className={fieldClasses}
          name={this.props.field.key}
        />

        <small className={textClasses}>
          Pakollinen kenttä ei voi olla tyhjä.
        </small>
      </fieldset>
    );
  },

  renderRadio() {
    const groupClasses = classnames(
      'form-group', {
        'has-danger': this.state.error,
      }
    );

    const textClasses = classnames(
      'text-danger', {
        'hidden-xs-up': !this.state.error,
      }
    );

    return (
      <fieldset className={groupClasses}>
        <label>
          {this.props.field.optional ? '' : '*'} {this.props.field.label}
        </label>

        {this.props.field.choices.map((choice, index) => {
          return (
            <div key={index} className='radio'>
              <label>
                <input
                  type='radio'
                  name={this.props.field.key}
                  defaultValue={choice}
                  onClick={() => {
                    this.setState({
                      radioSelection: choice,
                    });
                  }}
                />

                {choice}
              </label>
            </div>
          );
        })}

        <small className={textClasses}>
          Pakollinen valinta ei voi olla tyhjä.
        </small>
      </fieldset>
    );
  },

  renderSelect() {
    const groupClasses = classnames(
      'form-group', {
        'has-danger': this.state.error,
      }
    );

    const fieldClasses = classnames(
      'form-control', {
        'form-control-danger': this.state.error,
      }
    );

    const textClasses = classnames(
      'text-danger', {
        'hidden-xs-up': !this.state.error,
      }
    );

    return (
      <fieldset className={groupClasses}>
        <label>
          {this.props.field.optional ? '' : '*'} {this.props.field.label}
        </label>

        <select
          ref='input'
          className={fieldClasses}
          name={this.props.field.key}
          defaultValue='SELECT_PLACEHOLDER'
        >
          <option disabled value='SELECT_PLACEHOLDER'>
            Valitse {this.props.field.label.toLowerCase()}
          </option>

          {this.props.field.choices.map((choice, index) => {
            return <option key={index} value={choice}>{choice}</option>;
          })}
        </select>

        <small className={textClasses}>
          Pakollinen valinta ei voi olla tyhjä.
        </small>
      </fieldset>
    );
  },

  render() {
    const types = {
      'text': this.renderText,
      'radio': this.renderRadio,
      'select': this.renderSelect,
    };

    const type = this.props.field.type;
    if (!(type in types)) {
      return null;
    }

    return types[type]();
  },
});

export default RegistrationField;
