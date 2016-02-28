import React from 'react';
import {IconButton} from 'react-toolbox/lib/button';
import { List, ListItem } from 'react-toolbox';

export default class RequestsList extends React.Component {
  render () {
    return (
      <div>
        <h2>
          Previous Requests
          <IconButton icon='add_to_queue' onClick={this.handleAddLogin} />
        </h2>
        <List selectable ripple>
          <ListItem
            caption='/user/v1'
          />
        </List>
      </div>
    );
  }
}
