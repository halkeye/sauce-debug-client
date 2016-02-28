import React, { PropTypes } from 'react';

import { List, ListItem } from 'react-toolbox';

export default class LoginsList extends React.Component {
  render () {
    console.log('loginProps', this.props);
    return (
      <List selectable ripple>
        <ListItem
          caption='admin'
          legend='https://www.saucelabs.com'
          rightIcon='delete'
        />
        {this.props.logins.map((login) => {
          return <ListItem
            key={`${login.username}_${login.server}`}
            caption={login.username}
            legend={login.server || 'https://www.saucelabs.com'}
            rightIcon='delete'
          />;
        })}
      </List>
    );
  }
}

LoginsList.propTypes = {
  logins: PropTypes.array.isRequired
};
