import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab, updateTab, fetchData, switchTabLogin } from '../actions.js';

import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dialog from 'material-ui/lib/dialog';

import TabBar from '../components/TabBar.js';
import Login from '../components/Login.js';
import Results from '../components/Results.js';

import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText.js';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect.js';

class MainWindow extends React.Component {
  state = { canRequestUrl: false }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    updateTab: PropTypes.func.isRequired,
    switchTabLogin: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
    tabs: PropTypes.array.isRequired,
    currentTab: PropTypes.object.isRequired,
    logins: PropTypes.array.isRequired
  };

  onClickManageAccounts = () => {
    this.context.router.push({ pathname: '/accounts' });
  }

  enableButton = () => { this.setState({ canRequestUrl: true }); }
  disableButton = () => { this.setState({ canRequestUrl: false }); }
  onFormSubmitClick = () => { this.refs.form.submit(); }

  onSubmitForm = (model) => {
    let currentLogin = this.props.logins.filter((login) => login.guid === model.login).shift();

    this.props.fetchData(
      this.props.currentTab.guid,
      url.resolve(currentLogin.server, model.url)
    );
    this.props.updateTab(
      this.props.currentTab.guid,
      { login: model.login, url: model.url }
    );
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
          <Form
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            ref='form'
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.onSubmitForm}
          >
            <div style={{ flexGrow: 2 }}>
              <FormsySelect
                name='login'
                required
                value={this.props.currentTab.login.guid}
                floatingLabelText='Account'
              >
              {this.props.logins.map((login) => <MenuItem
                key={login.guid}
                value={login.guid}
                primaryText={<Login login={login} includeIcon={false} />}
              />)}
              </FormsySelect>
            </div>
            <div style={{ flexGrow: 2 }}>
              <FormsyText
                name='url'
                required
                type='url'
                floatingLabelText='URL'
                validations='minLength:1,maxLength:1000'
                value={this.props.currentTab.url}
              />
            </div>
            <div style={{ flexGrow: 1, marginRight: '1em' }}>
              <RaisedButton
                primary
                onClick={this.onFormSubmitClick}
                label='Go'
                type='submit'
                disabled={!this.state.canRequestUrl}
              />
            </div>
          </Form>
          <div style={{ display: 'flex', alignItems: 'stretch', alignContent: 'stretch' }}>
            <Results response={this.props.currentTab.response} />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateTab, switchTab, switchTabLogin, fetchData }, dispatch);
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
