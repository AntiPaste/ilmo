import React from 'react';
import classnames from 'classnames';

const Loading = React.createClass({
  propTypes: {
    loading: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  },

  _getContent() {
    const classes = classnames(
      'loading', {
        'hidden-xs-up': !this.props.loading,
      }
    );

    return (
      <div className={classes}>
        <div className='loading-wrapper'>
          <div className='la-ball-beat'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  },

  _getPlaceholder() {
    const classes = classnames({
      'invisible': this.props.loading,
    });

    return <span className={classes}>{this.props.placeholder}</span>;
  },

  render() {
    return (
      <div className='loading-wrapper'>
        {this._getContent()}
        {this._getPlaceholder()}
      </div>
    );
  },
});

export default Loading;
