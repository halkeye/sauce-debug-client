import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab, fetchData } from '../actions.js';

import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

// import Inspector from 'react-json-inspector';
import { ObjectInspector } from 'react-inspector';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';

import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import TabBar from './TabBar.js';
import Login from './Login.js';

class MainWindow extends React.Component {
  state = { url: '' };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
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
    this.props.fetchData(url.resolve(
      this.props.currentTab.login.server,
      'rest/' + this.props.currentTab.url
    ));
  }

  render () {
    return (
      <div>
        <TabBar />
        <div className='mui-container'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flexGrow: 1 }}>
              <SelectField value={ this.props.currentTab.login.guid }>
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
              <Input
                type='url'
                label='URL'
                floatingLabel
                onChange={this.onChangeUrl}
                value={this.state.url || this.props.currentTab.url}
              />
            </div>
            <div style={{ flexGrow: 1, marginRight: '1em' }}>
              <Button color='primary' variant='raised' onClick={this.onClickRequest}>Go</Button>
            </div>
          </div>
          <Panel>
            <ObjectInspector data={{ key: 'value' }} initialExpandedPaths={['*']} />
          </Panel>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ switchTab, fetchData }, dispatch);
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
