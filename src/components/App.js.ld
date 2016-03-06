import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'react-toolbox/lib/app_bar';
import {IconButton} from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';

import LoginsList from './LoginsList.js';
import RequestsList from './RequestsList.js';
import MainWindow from './MainWindow.js';

import {addLogin} from '../actions.js';

import 'flexboxgrid/css/flexboxgrid.min.css';

const mapStateToProps = (state) => {
  return {
    logins: state.logins,
    requests: state.requests
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddLogin: (username, password, server) => {
      dispatch(addLogin(username, password, server));
    }
  };
};

/* export default */ class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
  }

  // handleToggle = () => this.setState({open: !this.state.open});
  handleToggle = () => this.setState({open: !this.state.open});

  render () {
    return (
      <div>

        <AppBar flat>
          <IconButton icon='menu' flat onClick={this.handleToggle} />
          <h2>Sauce REST Tester</h2>
        </AppBar>
        <Drawer active={this.state.open} onOverlayClick={this.handleToggle}>
          <LoginsList logins={this.props.logins} onAddLogin={this.props.onAddLogin} />
          <RequestsList requests={this.props.requests} />
        </Drawer>
        <MainWindow logins={this.props.logins} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
App.propTypes = {
  logins: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
  onAddLogin: PropTypes.func.isRequired
};
