import React from 'react';
import ManageLoginDialog from './ManageLoginDialog.js';

import AppBar from 'react-toolbox/lib/app_bar';
import {IconButton} from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';

import LoginsList from './LoginsList.js';
import RequestsList from './RequestsList.js';

const AppContainer = () => <div />;

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      dialogOpen: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleAddLogin = () => this.setState({ dialogOpen: true });
  handleCloseDialog = () => this.setState({ dialogOpen: false });

  render () {
    const dialog = this.state.dialogOpen ? <ManageLoginDialog /> : null;
    return (
      <div>
        <header>
          <AppBar fixed flat>
            <IconButton icon='menu' flat onClick={this.handleToggle} />
            <h2>Sauce REST Tester</h2>
          </AppBar>
        </header>
        <Drawer active={this.state.open} onOverlayClick={this.handleToggle}>
          <h2>
            Logins
            <IconButton icon='person_add' onClick={this.handleAddLogin} />
          </h2>
          <LoginsList />
          <h2>
            Previous Requests
            <IconButton icon='add_to_queue' onClick={this.handleAddLogin} />
          </h2>
          <RequestsList />
        </Drawer>

        <AppContainer />
        {dialog}
      </div>
    );
  }
}
