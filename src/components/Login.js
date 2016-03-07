import url from 'url';
import React, { PropTypes } from 'react';

import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';

export default class Login extends React.Component {
  render () {
    const parsedUrl = url.parse(this.props.login.server);
    parsedUrl.auth = this.props.login.username;
    const label = url.format(parsedUrl);
    if (!this.props.includeIcon) { return <div>{label}</div>; }
    return (
      <div>
        <i style={{ float: 'right' }} className='zmdi zmdi-account'></i>
        &nbsp;
        {label}
      </div>
    );
  }
}

Login.propTypes = {
  includeIcon: PropTypes.bool,
  login: PropTypes.object.isRequired
};
Login.defaultProps = {
  includeIcon: true
};
