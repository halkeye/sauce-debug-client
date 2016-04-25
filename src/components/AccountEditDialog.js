import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLogin, deleteLogin, updateLogin } from '../actions.js';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import FormsyText from 'formsy-material-ui/lib/FormsyText.js';

import { Form } from 'formsy-react';

class AccountEditDialog extends React.Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    addLogin: PropTypes.func.isRequired,
    updateLogin: PropTypes.func.isRequired,
    deleteLogin: PropTypes.func.isRequired,
    onDone: PropTypes.func
  };

  state = { canSubmit: false };

  enableButton = () => { this.setState({ canSubmit: true }); }
  disableButton = () => { this.setState({ canSubmit: false }); }

  submitForm = (model) => {
    if (this.props.login.guid) {
      this.props.updateLogin(this.props.login.guid, {
        username: model.username,
        accesskey: model.accesskey,
        server: model.server
      });
    } else {
      this.props.addLogin(model.username, model.accesskey, model.server);
    }
    this.refs.form.reset();
    if (this.props.onDone) { this.props.onDone(); }
  }

  onClickSubmit = () => { this.refs.form.submit(); }
  onClickDelete = () => {
    this.props.deleteLogin(this.props.login.guid);
    if (this.props.onDone) { this.props.onDone(); }
  }

  render () {
    const actions = [
      <FlatButton
        type='submit'
        primary
        disabled={!this.state.canSubmit}
        onClick={this.onClickSubmit}
        label='Save'
      />,
      <FlatButton
        secondary
        disabled={!this.props.login.guid}
        onClick={this.onClickDelete}
        label='Delete'
      />
    ];

    return (
      <Dialog
        title={this.props.login.guid ? 'Edit' : 'Add'}
        onRequestClose={this.props.onDone}
        actions={actions}
        autoScrollBodyContent
        open
      >
        <Form ref='form'
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          >
          <FormsyText
            name='username'
            required
            value={this.props.login.username}
            hintText='Sauce Labs Username'
            validations='minLength:1,maxLength:1000'
          />
          <br />
          <FormsyText
            name='accesskey'
            type='password'
            value={this.props.login.accesskey}
            required
            hintText='Sauce Labs Access Key'
            validations='minLength:1,maxLength:1000'
          />
          <br/>
          <FormsyText
            name='server'
            type='url'
            value={this.props.login.server || 'https://saucelabs.com/'}
            required
            validation='minLength:1,maxLength:1000'
          />
          <br/>
        </Form>
      </Dialog>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addLogin, deleteLogin, updateLogin }, dispatch);
}

function mapStateToProps (state) { return { }; }
export default connect(mapStateToProps, mapDispatchToProps)(AccountEditDialog);
