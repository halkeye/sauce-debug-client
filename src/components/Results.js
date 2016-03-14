import React, { PropTypes } from 'react';

import JSONPretty from 'react-json-pretty';
import { ObjectInspector } from 'react-inspector';

import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class Results extends React.Component {
  static propTypes = {
      results: React.PropTypes.shape({
          url: React.PropTypes.string.isRequired,
          results: React.PropTypes.object.isRequired
      })
  };

  render() {
    if (!this.props.results) {
      return null;
    }
    if (!this.props.results.results) {
      return (
        <Paper style={{ width: '100%', height: '100%', textAlign: 'center' }} zDepth={2}>
          <CircularProgress size={2} />
        </Paper>
      );
    }
    return (
      <Paper style={{ width: '100%', height: '100%', textAlign: 'center' }} zDepth={2}>
        <JSONPretty json={this.props.currentTab.response} initialExpandedPaths={['*']} />
      </Paper>
    );
  }
}
