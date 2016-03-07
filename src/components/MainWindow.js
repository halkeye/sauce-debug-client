import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab } from '../actions.js';

import 'flexboxgrid';
import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

// import Inspector from 'react-json-inspector';
import { ObjectInspector } from 'react-inspector';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import Divider from 'muicss/lib/react/divider';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

import TabBar from './TabBar.js';
import Login from './Login.js';

class MainWindow extends React.Component {
  state = { url: '' };

  handleChange = (value) => {
    this.setState({selected: value});
  };

  getMappedLogins = () => {
    return this.props.logins.map((login) => {
      const parsedUrl = url.parse(login.server);
      parsedUrl.auth = login.username;
      return {
        value: `${login.username}@${login.server}`,
        label: url.format(parsedUrl)
      };
    });
  };

  onChangeUrl = (ev) => {
    this.setState({ url: ev.target.value });
  }

  render () {
    const currentTabData = this.props.tabs.filter((tab) => tab.guid === this.props.tab).shift();

    /* Maybe do a Menu of logins? */
    return (
      <div>
        <TabBar />
        <div className='mui-container'>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 2 }}>
              <Input
                type='url'
                label='URL'
                floatingLabel
                onChange={this.onChangeUrl}
                value={this.state.url || currentTabData.url}
              />
            </div>
            <div style={{ flexGrow: 1, marginRight: '1em' }}>
              <Button color='primary' variant='raised' style={{ float: 'right' }}>Go</Button>
            </div>
            <div style={{ flexGrow: 1 }}>
              <Dropdown color='primary' label='Account'>
                <DropdownItem><Login login={{}} /></DropdownItem>
                <Divider />
                <DropdownItem>
                  <i className='zmdi zmdi-account-add'></i>
                  &nbsp;
                  Manage
                </DropdownItem>
              </Dropdown>
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

MainWindow.propTypes = {
  tab: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  logins: PropTypes.array.isRequired
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ switchTab }, dispatch);
}

function mapStateToProps (state) {
  return {
    logins: state.logins,
    tab: state.tab,
    tabs: state.tabs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
