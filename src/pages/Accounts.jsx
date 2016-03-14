import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLogin } from '../actions.js';

import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import FormsyText from 'formsy-material-ui/lib/FormsyText.js';

import { Form } from 'formsy-react';

import AccountEditDialog from '../components/AccountEditDialog.js';

class Accounts extends React.Component {
  static propTypes = {
    logins: PropTypes.array.isRequired
  };

  state = { canSubmit: false, editLogin: false };

  handleAddNewClick = () => { this.setState({ editLogin: {} }); }
  handleNewAccountFormClose  = () => { this.setState({ editLogin: false }); }

  enableButton = () => { this.setState({ canSubmit: true }); }
  disableButton = () => { this.setState({ canSubmit: false }); }

  submitForm = (model) => {
    this.props.addLogin(model.username, model.accesskey, model.server);
    this.refs.form.reset();
    this.handleNewAccountFormClose();
  }

  render () {
    return (
      <div>
        <h4>Accounts</h4>
        <List subhader='Accounts'>{this.props.logins.map((login) => {
          return <ListItem
            key={login.guid}
            onTouchTap={() => {this.setState({ editLogin: login })}}
            rightIcon={<ActionInfo />}
            secondaryText={login.server}
            primaryText={login.username}
          />;
        })}</List>
        <RaisedButton
          primary
          label='Add New'
          onTouchTap={this.handleAddNewClick}
        />
        {this.state.editLogin ?
          <AccountEditDialog onDone={this.handleNewAccountFormClose} login={this.state.editLogin} /> :
          null }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { logins: state.logins };
}

export default connect(mapStateToProps)(Accounts);
