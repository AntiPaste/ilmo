/**
 * ExampleView.js - React component ExampleView
 *
 * Copyright 2015 Taito United Oy
 * All rights reserved.
 */

import React from 'react';
import classNames from 'classnames';

const Messages = React.createClass({
  propTypes: {
    messageStore: React.PropTypes.object.isRequired,
    messageActionCreators: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    const store = this._getStoreData();
    return {
      seenMessages: {},
      messages: store.messages,
    };
  },

  componentDidMount() {
    this._messageStoreSubscription = this.props.messageStore.addListener(
      this._onStoreChange
    );
  },

  componentWillUnmount() {
    this._messageStoreSubscription.remove();
  },

  _onStoreChange() {
    const store = this._getStoreData();
    const seenMessages = this.state.seenMessages;
    Object.keys(store.messages).forEach((messageID) => {
      if (seenMessages[messageID]) return;
      if (store.messages[messageID].future) return;
      seenMessages[messageID] = store.messages[messageID];

      setTimeout((id) => {
        this.props.messageActionCreators.expireMessage(id);
      }, 3000, messageID);
    });

    this.setState({
      seenMessages: seenMessages,
      messages: store.messages,
    });
  },

  _getStoreData() {
    return this.props.messageStore.getState();
  },

  _getContent() {
    return Object.keys(this.state.messages).map((key) => {
      const message = this.state.messages[key];
      if (message.future) return null;

      const classes = classNames(
        'messages-message',
        'alert',
        `alert-${message.type}`
      );

      return (
        <div key={key} className={classes}>
          {message.content}
        </div>
      );
    });
  },

  render() {
    let content = null;

    if (this.state.messages !== null) {
      content = this._getContent();
    }

    return (
      <div className='messages'>
        {content}
      </div>
    );
  },
});

export default Messages;
