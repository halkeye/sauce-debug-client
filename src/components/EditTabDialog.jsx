import React, { PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import FormsyText from 'formsy-material-ui/lib/FormsyText.js';

import { Form } from 'formsy-react';

export default class EditTabDialog extends React.Component {
  state = { canSubmit: false };
  static propTypes = {
    tab: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };

  enableButton = () => { this.setState({ canSubmit: true }); }
  disableButton = () => { this.setState({ canSubmit: false }); }
  onClickSubmit = () => { this.refs.form.submit(); }

  submitForm = (model) => {
    this.props.onSave(this.props.tab.guid, model.label);
  }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label='Submit'
        primary
        disabled={!this.state.canSubmit}
        onTouchTap={this.onClickSubmit}
      />
    ];

    return (
      <Dialog title='Edit Tab' actions={actions} modal open>
        <Form
          ref='form'
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
        >
          <FormsyText
            name='label'
            fullWidth
            required
            keyboardFocused
            value={this.props.tab.label}
            floatingLabelText='Label'
            validations='minLength:1,maxLength:1000'
            validationError='Must be one or more words'
          />
        </Form>
      </Dialog>
    );
  }
}

