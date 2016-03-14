import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab, fetchData, switchTabLogin } from '../actions.js';

import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dialog from 'material-ui/lib/dialog';

import TabBar from '../components/TabBar.js';
import Login from '../components/Login.js';
import Results from '../components/Results.js';

class MainWindow extends React.Component {
  state = { url: '' };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    switchTabLogin: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    currentTab: PropTypes.object.isRequired,
    logins: PropTypes.array.isRequired
  };

  onChangeUrl = (ev) => {
    this.setState({ url: ev.target.value });
  }

  onClickManageAccounts = () => {
    this.context.router.push({ pathname: '/accounts' });
  }

  onClickRequest = () => {
    this.props.fetchData(this.props.currentTab.guid, url.resolve(
      this.props.currentTab.login.server,
      this.props.currentTab.url
    ));
  }

  onChangeLogin = (event, index, loginGuid) => {
    this.props.switchTabLogin(this.props.currentTab.guid, loginGuid);
  }

  render () {
    if (!this.props.logins || this.props.logins.length === 0) {
      const actions = [
        <FlatButton
          label='Manage Accounts'
          primary
          onTouchTap={this.onClickManageAccounts}
        />
      ];
      return (
        <Dialog
          title='No accounts'
          actions={actions}
          modal
          open
        />
      );
    }
    return (
      <div>
        <TabBar />
        <div id='appContent'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flexGrow: 2 }}>
              <SelectField
                value={this.props.currentTab.login.guid}
                onChange={this.onChangeLogin}
                floatingLabelText='Account'
              >
                {this.props.logins.map((login) => <MenuItem key={login.guid} value={login.guid} primaryText={<Login login={login} includeIcon={false} />} />)}
                <Divider />
                <MenuItem key='manage' onClick={this.onClickManageAccounts}>
                  <i className='zmdi zmdi-account-add'></i>
                  &nbsp;
                  Manage
                </MenuItem>
              </SelectField>
            </div>
            <div style={{ flexGrow: 2 }}>
              <TextField
                type='url'
                floatingLabelText='URL'
                onChange={this.onChangeUrl}
                value={this.props.currentTab.url}
              />
            </div>
            <div style={{ flexGrow: 1, marginRight: '1em' }}>
              <RaisedButton primary onClick={this.onClickRequest} label='Go' />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'stretch', alignContent: 'stretch' }}>
            <Results response={this.props.currentTab.response} />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ switchTab, switchTabLogin, fetchData }, dispatch);
}

function mapStateToProps (state) {
  return {
    logins: state.logins,
    tab: state.tab,
    tabs: state.tabs
  };
}
function mergeProps (stateProps, dispatchProps, ownProps) {
  const currentTab = stateProps.tabs.filter((tab) => tab.guid === stateProps.tab).shift();
  let currentLogin = stateProps.logins.filter((login) => login.guid === currentTab.login).shift();
  if (currentLogin == null) {
    currentLogin = stateProps.logins[0] || {};
  }
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    currentTab: { ...currentTab, login: currentLogin }
  });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainWindow);
