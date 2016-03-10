import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLogin } from '../actions.js';

import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';

import FormsyText from 'formsy-material-ui/lib/FormsyText.js';

import { Form } from 'formsy-react';

class Accounts extends React.Component {
  state = { canSubmit: false };

  enableButton = () => {
    this.setState({ canSubmit: true });
  }

  disableButton = () => {
    this.setState({ canSubmit: false });
  }

  submitForm = (model) => {
    this.props.addLogin(model.username, model.accesskey, model.server);
    this.refs.form.reset();
  }

  render () {
    return (
      <div>
        <h4>Accounts</h4>
        <List subhader='Accounts'>{this.props.logins.map((login) => {
          return <ListItem
            rightIcon={<ActionInfo />}
            secondaryText={login.server}
            primaryText={login.username}
          />;
        })}</List>
        <Divider />
        <h4>Add New</h4>
        <Form ref='form'
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          >
          <FormsyText
            name='username'
            required
            hintText='Sauce Labs Username'
            validations='isAlpha,minLength:1,maxLength:1000'
          />
          <br />
          <FormsyText
            name='accesskey'
            type='password'
            required
            hintText='Sauce Labs Access Key'
            validations='minLength:1,maxLength:1000'
          />
          <br/>
          <FormsyText
            name='server'
            type='url'
            value='https://saucelabs.com/'
            required
          />
          <br/>
          <RaisedButton
            type='submit'
            primary
            disabled={!this.state.canSubmit}
            label='Add new Login'
          />
        </Form>
      </div>
    );
  }
}

Accounts.propTypes = {
  logins: PropTypes.array.isRequired,
  addLogin: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addLogin }, dispatch);
}

function mapStateToProps (state) {
  return {
    logins: state.logins
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
