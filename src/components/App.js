import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Link } from 'react-router';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});
  handleSetLeftNavState = (open) => this.setState({open});

  static propTypes = {
    children: PropTypes.element.isRequired
  };

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
          <MenuItem onTouchTap={this.handleClose}><Link to='/'>Requests</Link></MenuItem>
          <MenuItem onTouchTap={this.handleClose}><Link to='/accounts'>Accounts</Link></MenuItem>
        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}
