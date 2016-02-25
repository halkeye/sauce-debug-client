import React from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import TextField from 'material-ui/lib/text-field';

import 'material-icons/css/material-icons.css';

export default class ManageLoginDialog extends React.Component {
  constructor (props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  handleAddLogin = () => this.setState({ dialogOpen: true });
  handleCloseDialog = () => this.setState({ dialogOpen: false });
  handleCreateLogin = () => {
    this.handleCloseDialog();
  }

  render () {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Login"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDialog}
      />,
    ];

    return (
      <Dialog
        title="Add new Login"
        actions={dialogActions}
        modal={true}
        onRequestClose={this.handleCloseDialog}
      >
        <TextField
          fullWidth={true}
          hintText="Username"
          floatingLabelText="Username"
          type="text"
        />
        <br/>
        <TextField
          fullWidth={true}
          hintText="Access Key Field"
          floatingLabelText="Access Key"
          type="password"
        />
        <br/>
        <TextField
          fullWidth={true}
          hintText="Sauce labs url"
          floatingLabelText="URL"
          type="url"
          defaultValue="https://saucelabs.com/"
        />
      </Dialog>
    );
  }
}

