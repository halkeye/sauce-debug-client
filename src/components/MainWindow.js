import url from 'url';

import React, { PropTypes } from 'react';

import 'flexboxgrid';
import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

import Divider from 'muicss/lib/react/divider';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

import Login from './Login.js';

export default class MainWindow extends React.Component {
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
    console.log(JSON.stringify(values));

    /* Maybe do a Menu of logins? */
    return (
      <div>
        <ul className='mui-tabs__bar'>
          <li className='mui--is-active'><a>Tab-1</a></li>
          <li><a>Tab-2</a></li>
          <li><a>Tab-3</a></li>
        </ul>
        <div className='mui-tabs__pane mui--is-active'>
          <div className='row'>
            <div className='col-xs'>
              Input
            </div>
            <div className='col-xs-3'>
              <Dropdown color='primary' label='Login'>
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
        </div>
      </div>
    );
  }
}

MainWindow.propTypes = {
};
