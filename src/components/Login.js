import React, { PropTypes } from 'react';

import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';

export default class Login extends React.Component {
  render () {
    return (
      <div>
        <i style={{ float: 'right' }} className='zmdi zmdi-account'></i>
        &nbsp;
        zmdi-flower-alt
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired
};
