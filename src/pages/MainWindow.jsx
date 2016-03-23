import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTab, switchTab, updateTab } from '../actions.js';

import AppBar from 'material-ui/lib/app-bar';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';

import AccountPage from './Accounts.jsx';
import RequestPage from './RequestPage.jsx';

// Makes sure react-ui's touch events work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class TabListItem extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    this.props.onClick(this.props.tab.guid);
  }

  render () {
    const style = {};
    if (this.props.tab.selected) {
      style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }
    return <ListItem style={style} onClick={this.onClick}>{this.props.tab.label}</ListItem>;
  }
}

class MainWindow extends React.Component {
  static propTypes = {
    addTab: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired,
    currentTab: PropTypes.object,
    tabs: PropTypes.array.isRequired
  };

  handleTabAddButtonClick = () => {
    this.props.addTab();
  }

  handleDoubleClickTab = (...args) => {
    console.log('gavin', ...args);
  }

  handleClickAccounts = () => {
    this.props.switchTab('');
  }

  render () {
    return (
      <div>
        <AppBar style={{ zIndex: 9000 }} title='Rest Tester' />
        <div style={{ width: '140px', position: 'absolute', height: '100%' }}>
          <Paper zDepth={2} rounded={false} style={{ height: '100%' }}>
            <List>
              <ListItem onClick={this.handleClickAccounts} >Accounts</ListItem>
            </List>
            <Divider />
            <List>
              {this.props.tabs.map((tab) => <TabListItem key={tab.guid} onClick={this.props.switchTab} tab={tab} />)}
            </List>
          </Paper>
        </div>
        <div style={{ paddingLeft: '150px' }}>
          {this.props.currentTab ? <RequestPage tab={this.props.currentTab} /> : <AccountPage />}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addTab, updateTab, switchTab }, dispatch);
}

function mapStateToProps (state) {
  return { tabs: state.tabs };
}
function mergeProps (stateProps, dispatchProps, ownProps) {
  const currentTab = stateProps.tabs.filter((tab) => tab.selected).shift();
  return Object.assign({}, stateProps, dispatchProps, ownProps,
    { currentTab }
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainWindow);
