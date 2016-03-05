import React from 'react';
import RegistrationDetails from '../RegistrationDetails';
import RegistrationForm from '../RegistrationForm';

const RegistrationView = React.createClass({
  propTypes: {
    eventStore: React.PropTypes.object.isRequired,
    registrationActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return this._getStoreData();
  },

  componentDidMount() {
    this._eventStoreSubscription = this.props.eventStore.addListener(
      this._onStoreChange
    );
  },

  componentWillUnmount() {
    this._eventStoreSubscription.remove();
  },

  _onStoreChange() {
    this.setState(this._getStoreData());
  },

  _getStoreData() {
    return {
      eventState: this.props.eventStore.getState(),
    };
  },

  render() {
    return (
      <div className='container'>
        <RegistrationDetails event={this.state.eventState.event} />
        <RegistrationForm
          event={this.state.eventState.event}
          registrationActionCreators={this.props.registrationActionCreators}
        />
      </div>
    );
  },
});

export default RegistrationView;
