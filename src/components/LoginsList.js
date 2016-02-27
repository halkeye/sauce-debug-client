import React from 'react';
import { List, ListItem } from 'react-toolbox';

export default class LoginsList extends React.Component {
  render () {
    return (
      <List selectable ripple>
        <ListItem
          caption='halkeye'
          legend='https://www.saucelabs.com'
          rightIcon='delete'
        />
        <ListItem
          caption='admin'
          legend='https://www.saucelabs.com'
          rightIcon='delete'
        />
      </List>
    );
  }
}
