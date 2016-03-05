import React from 'react';

const RegistrationField = React.createClass({
  propTypes: {
    field: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      radioSelection: null,
    };
  },

  getValue() {
    if (this.props.field.type === 'radio') {
      return this.state.radioSelection;
    }

    return this.refs.input.value;
  },

  renderText() {
    return (
      <fieldset className='form-group'>
        <label>{this.props.field.label}</label>

        <input
          ref='input'
          type='text'
          className='form-control'
          name={this.props.field.key}
        />
      </fieldset>
    );
  },

  renderRadio() {
    return (
      <fieldset className='form-group'>
        <label>{this.props.field.label}</label>

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
      </fieldset>
    );
  },

  renderSelect() {
    return (
      <fieldset className='form-group'>
        <label>{this.props.field.label}</label>

        <select
          ref='input'
          className='form-control'
          name={this.props.field.key}
        >
          {this.props.field.choices.map((choice, index) => {
            return <option key={index}>{choice}</option>;
          })}
        </select>
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
