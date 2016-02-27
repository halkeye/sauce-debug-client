import React from 'react';
import { List, ListItem } from 'react-toolbox';

export default class RequestsList extends React.Component {
  render () {
    return (
      <List selectable ripple>
        <ListItem
          caption='/user/v1'
        />
      </List>
    );
  }
}
