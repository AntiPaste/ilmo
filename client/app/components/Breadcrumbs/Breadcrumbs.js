import React from 'react';
import classnames from 'classnames';

const Breadcrumbs = React.createClass({
  propTypes: {
    path: React.PropTypes.array.isRequired,
  },

  _getCrumb(crumb, index) {
    const active = (index + 1 === this.props.path.length);
    const classes = classnames(
      'breadcrumbs-list-item', {
        'active': active,
      }
    );

    return (
      <li key={index} className={classes}>
        {active ?
          <span>{crumb.name}</span> :
          <a href={crumb.url}>
            {crumb.name}
          </a>
        }
      </li>
    );
  },

  render() {
    return (
      <div className='breadcrumbs'>
        <ol className='breadcrumbs-list breadcrumb'>
          {this.props.path.map(this._getCrumb)}
        </ol>
      </div>
    );
  },
});

export default Breadcrumbs;
