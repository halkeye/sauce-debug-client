import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab } from '../actions.js';

import 'flexboxgrid';
import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

import Divider from 'muicss/lib/react/divider';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

import TabBar from './TabBar.js';
import Login from './Login.js';

class MainWindow extends React.Component {
  state = { selected: '' };

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

  render () {
    const values = []; // this.getMappedLogins();

    /* Maybe do a Menu of logins? */
    return (
      <div>
        <TabBar />
        <div className=''>
          <div className='mui-container'>
            <div className='row'>
              <div className='col-xs'>
                Input
              </div>
              <div className='col-xs-3'>
                <Dropdown color='primary' label='Login'>
                  <DropdownItem><Login login={{}} /></DropdownItem>
                  <Divider />
                  <DropdownItem>
                    ndStoreToMenu<i className='zmdi zmdi-account-add'></i>
                    &nbsp;
                    Manage
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainWindow.propTypes = {
  tab: PropTypes.string.isRequired,
  logins: PropTypes.array.isRequired,
  switchTab: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ switchTab }, dispatch);
}

function mapStateToProps (state) {
  return {
    logins: state.logins,
    tab: state.tab,
    login: state.logins
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
