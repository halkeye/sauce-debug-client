import React from 'react';

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import Dialog from 'material-ui/lib/dialog';

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
      <div>
        <AppBar
            title="Sauce REST Tester"
            onLeftIconButtonTouchTap={this.handleToggle}
            iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <LeftNav open={this.state.open} docked={false}>
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
        <Dialog
          title="Add new Login"
          actions={dialogActions}
          modal={true}
          open={this.state.dialogOpen}
          onRequestClose={this.handleCloseDialog}
        >
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
      </div>
    );
  }
}
