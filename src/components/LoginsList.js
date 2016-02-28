import React, { PropTypes } from 'react';

import { List, ListItem } from 'react-toolbox';
import {IconButton} from 'react-toolbox/lib/button';

import ManageLoginDialog from './ManageLoginDialog.js';

export default class LoginsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
  }

  handleAddLogin = () => this.setState({ dialogOpen: true });
  handleCloseDialog = () => this.setState({ dialogOpen: false });

  render () {
    const dialog = this.state.dialogOpen ? <ManageLoginDialog onAddLogin={this.props.onAddLogin} onDone={this.handleCloseDialog} /> : null;

    return (
      <div>
        <h2>
          Logins
          <IconButton icon='person_add' onClick={this.handleAddLogin} />
        </h2>
        <List selectable ripple>
          {this.props.logins.map((login) => {
            return <ListItem
              key={`${login.username}_${login.server}`}
              caption={login.username}
              legend={login.server || 'https://www.saucelabs.com'}
              rightIcon='delete'
            />;
          })}
        </List>
        {dialog}
      </div>
    );
  }
}

LoginsList.propTypes = {
  logins: PropTypes.array.isRequired,
  onAddLogin: PropTypes.func.isRequired
};
