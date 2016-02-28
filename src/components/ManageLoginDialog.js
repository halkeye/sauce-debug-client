import React, { PropTypes } from 'react';

import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';

export default class ManageLoginDialog extends React.Component {
  constructor (props) {
    super(props);
    this.state = { username: '', password: '', server: 'https://saucelabs.com/' };

    ['username', 'password', 'server'].forEach((key) => {
      let funcName = `handle${key.charAt(0).toUpperCase() + key.slice(1)}Change`;
      this[funcName] = (val) => this.handleChange(key, val);
    });
  }

  handleCreateLogin = () => {
    this.props.onAddLogin(this.state.username, this.state.password, this.state.server);
    this.props.onDone();
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    const dialogActions = [
      { label: 'Cancel', onClick: this.props.onDone },
      { label: 'Save', onClick: this.handleCreateLogin }
    ];

    return (
      <Dialog
        title='Add new Login'
        actions={dialogActions}
        onOverlayClick={this.props.onDone}
        active
      >
        <Input type='text'
          value={this.state.username}
          onChange={this.handleUsernameChange}
          required
          label='Username'
          floatingLabelText='Username'
        />
        <br/>
        <Input type='password'
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required
          label='Access Key Field'
          floatingLabelText='Access Key'
        />
        <br/>
        <Input type='url'
          value={this.state.server}
          onChange={this.handleServerChange}
          label='Sauce labs url'
          floatingLabelText='URL'
        />
      </Dialog>
    );
  }
}

ManageLoginDialog.propTypes = {
  onAddLogin: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};
