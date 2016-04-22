import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab, updateTab, fetchData, switchTabLogin } from '../actions.js';

import Dialog from 'material-ui/lib/dialog';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/lib/raised-button';

import Login from '../components/Login.js';
import Results from '../components/Results.js';

import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText.js';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect.js';

class PresetMenuItem extends React.Component {
  static propTypes = {
    primaryText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  onClick = () => {
    this.props.onClick(this.props.value);
  }

  render () {
    return <MenuItem primaryText={this.props.primaryText} onTouchTap={this.onClick} />;
  }
}

class PresetMenu extends React.Component {
  static propTypes = {
    onSelectPreset: PropTypes.func.isRequired
  }

  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
        <MenuItem primaryText='Presets' style={{ fontStyle: 'underline', fontWeight: 'bold' }} />
        <PresetMenuItem primaryText='Status' value='rest/v1/info/status' onClick={this.props.onSelectPreset} />
        <PresetMenuItem primaryText='User Info' value='rest/v1/users/:username:' onClick={this.props.onSelectPreset} />
        <PresetMenuItem primaryText='Full tunnel information' value='rest/v1/:username:/tunnels?full=1' onClick={this.props.onSelectPreset} />
        <PresetMenuItem primaryText='Stored Files' value='rest/v1/storage/:username:' onClick={this.props.onSelectPreset} />
      </IconMenu>
    );
  }
}
class RequestPage extends React.Component {
  state = { canRequestUrl: false }

  static propTypes = {
    updateTab: PropTypes.func.isRequired,
    switchTabLogin: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    tab: PropTypes.object.isRequired,
    logins: PropTypes.array.isRequired,
    currentLogin: PropTypes.object
  };

  enableButton = () => { this.setState({ canRequestUrl: true }); }
  disableButton = () => { this.setState({ canRequestUrl: false }); }
  onFormSubmitClick = () => { this.refs.form.submit(); }

  onSubmitForm = (model) => {
    let currentLogin = this.props.logins.filter((login) => login.guid === model.login).shift();

    this.props.fetchData(
      currentLogin,
      this.props.tab,
      url.resolve(currentLogin.server, model.url).replace(/:username:/g, currentLogin.username)
    );
    this.props.updateTab(
      this.props.tab.guid,
      { login: model.login, url: model.url }
    );
  }

  onChangeLogin = (event, index, loginGuid) => {
    this.props.switchTabLogin(this.props.tab.guid, loginGuid);
  }

  onChangePreset = (preset) => {
    this.refs.url.setValue(preset);
  }

  render () {
    if (!this.props.currentLogin || !this.props.logins || this.props.logins.length === 0) {
      return (
        <Dialog
          title='No accounts'
          modal
          open
        />
      );
    }
    return (
      <div id='appContent'>
        <Form
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          ref='form'
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.onSubmitForm}
        >
          <div style={{ paddingRight: '10px' }}>
            <FormsySelect
              fullWidth
              autoWidth
              name='login'
              required
              value={this.props.currentLogin.guid}
              floatingLabelText='Account'
            >
            {this.props.logins.map((login) => <MenuItem
              key={login.guid}
              value={login.guid}
              primaryText={<Login login={login} includeIcon={false} />}
            />)}
            </FormsySelect>
          </div>
          <div style={{ flexGrow: 3 }}>
            <FormsyText
              ref='url'
              name='url'
              required
              fullWidth
              type='url'
              floatingLabelText='URL'
              validations='minLength:1,maxLength:1000'
              value={this.props.tab.url}
            />
          </div>
          <div>
            <PresetMenu onSelectPreset={this.onChangePreset} />
          </div>
          <div style={{ marginRight: '1em' }}>
            <RaisedButton
              primary
              onClick={this.onFormSubmitClick}
              label='Go'
              type='submit'
              disabled={!this.state.canRequestUrl}
            />
          </div>
        </Form>
        <div style={{ display: 'flex', alignItems: 'stretch', alignContent: 'stretch' }}>
          <Results response={this.props.tab.response} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ updateTab, switchTab, switchTabLogin, fetchData }, dispatch);
}

function mapStateToProps (state) {
  return { logins: state.logins };
}
function mergeProps (stateProps, dispatchProps, ownProps) {
  let currentLogin = stateProps.logins.filter((login) => login.guid === ownProps.tab.login).shift();
  if (currentLogin == null) {
    currentLogin = stateProps.logins[0] || null;
  }
  return Object.assign({}, stateProps, dispatchProps, ownProps, { currentLogin });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RequestPage);
