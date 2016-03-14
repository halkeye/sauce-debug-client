import React from 'react';

import JSONPretty from 'react-json-pretty';
// import { ObjectInspector } from 'react-inspector';

import Paper from 'material-ui/lib/paper';
import CircularProgress from 'material-ui/lib/circular-progress';

import 'react-json-pretty/JSONPretty.monikai.styl';

export default class Results extends React.Component {
  static propTypes = {
    response: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
      response: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
      ]).isRequired
    })
  };

  render () {
    if (!this.props.response) { return <div/>; }
    if (!this.props.response.response) {
      return (
        <Paper style={{ width: '100%', height: '100%', textAlign: 'center' }} zDepth={2}>
          <CircularProgress size={2} />
        </Paper>
      );
    }
    return (
      <Paper style={{ width: '100%', height: '100%', textAlign: 'left' }} zDepth={2}>
        <JSONPretty json={this.props.response.response} initialExpandedPaths={['*']} />
      </Paper>
    );
  }
}
