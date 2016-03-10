import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  state = { open: false };

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});
  handleSetLeftNavState = (open) => this.setState({open});
  handleClickRequest = () => {
    this.context.router.push({ pathname: '/' });
    this.handleClose();
  }
  handleClickAccounts = () => {
    this.context.router.push({ pathname: '/accounts' });
    this.handleClose();
  }

  render () {
    return (
      <div>
        <AppBar onTouchTap={this.handleToggle} title='Rest Tester' />
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={this.handleSetLeftNavState}
        >
          <MenuItem onTouchTap={this.handleClickRequest}>Requests</MenuItem>
          <MenuItem onTouchTap={this.handleClickAccounts}>Accounts</MenuItem>
        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}
