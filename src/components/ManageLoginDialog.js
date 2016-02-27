import React from 'react';

import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';

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
      { label: 'Cancel', onClick: this.handleCloseDialog },
      { label: 'Save', onClick: this.handleCloseDialog }
    ];

    return (
      <Dialog
        title='Add new Login'
        actions={dialogActions}
        onOverlayClick={this.handleCloseDialog}
        active
      >
        <Input type='text'
          required
          label='Username'
          floatingLabelText='Username'
        />
        <br/>
        <Input type='password'
          required
          label='Access Key Field'
          floatingLabelText='Access Key'
        />
        <br/>
        <Input type='url'
          label='Sauce labs url'
          floatingLabelText='URL'
          value='https://saucelabs.com/'
        />
      </Dialog>
    );
  }
}

