import React from 'react';
import ManageLoginDialog from './ManageLoginDialog.js';

import RaisedButton from 'material-ui/lib/raised-button';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import TextField from 'material-ui/lib/text-field';

import 'material-icons/css/material-icons.css';

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
          <AppBar
              title="Sauce REST Tester"
              onLeftIconButtonTouchTap={this.handleToggle}
              iconClassNameRight="muidocs-icon-navigation-expand-more" />
        </header>
        <LeftNav open={this.state.open} docked={true}>
          <AppBar
              title="Logins"
              iconClassNameRight="mi mi-add-circle"
              onRightIconButtonTouchTap={this.handleAddLogin}
              showMenuIconButton={false}
          />
          <Menu>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Menu>
          <AppBar
              title="Previous Requests"
              showMenuIconButton={false}
          />
          <Menu>
            <MenuItem>/user/v1</MenuItem>
          </Menu>
        </LeftNav>

        <AppContainer />
        {dialog}
      </div>
    );
  }
}
