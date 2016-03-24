import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTab, switchTab, updateTab, deleteTab } from '../actions.js';

import AppBar from 'material-ui/lib/app-bar';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import CreateIcon from 'material-ui/lib/svg-icons/content/add-box';

import AccountPage from './Accounts.jsx';
import RequestPage from './RequestPage.jsx';
import EditTabDialog from '../components/EditTabDialog.jsx';

class TabListItem extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
  };

  onClick = () => {
    this.props.onClick(this.props.tab.guid);
  }

  onEdit = () => {
    this.props.onEdit(this.props.tab);
  }

  render () {
    const style = {};
    if (this.props.tab.selected) {
      style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }
    return <ListItem
      style={style}
      rightIconButton={<IconButton onClick={this.onEdit}><EditIcon /></IconButton>}
      onClick={this.onClick}
    >{this.props.tab.label}</ListItem>;
  }
}

class MainWindow extends React.Component {
  static propTypes = {
    addTab: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired,
    updateTab: PropTypes.func.isRequired,
    deleteTab: PropTypes.func.isRequired,
    currentTab: PropTypes.object,
    tabs: PropTypes.array.isRequired
  };

  handleCreateNewRequest = () => {
    this.props.addTab();
  }

  handleClickAccounts = () => {
    this.props.switchTab('');
  }

  handleEditTab = (tab) => {
    this.setState({ editTab: tab });
  }

  handleCloseEditTab = () => {
    this.handleEditTab(null);
  }

  handleDeleteEditTab = (guid) => {
    this.props.deleteTab(guid);
    this.handleCloseEditTab();
  }

  handleUpdateTab = (guid, label) => {
    this.props.updateTab(guid, { label });
    this.handleCloseEditTab();
  }

  render () {
    const sideBarWidth = 200;
    return (
      <div>
        <AppBar style={{ zIndex: 9000 }} title='Rest Tester' />
        <div style={{ width: sideBarWidth, position: 'absolute', height: '100%' }}>
          <Paper zDepth={2} rounded={false} style={{ height: '100%' }}>
            <ListItem onClick={this.handleClickAccounts} >Accounts</ListItem>
            <Divider />
            <ListItem onClick={this.handleCreateNewRequest} leftIcon={<CreateIcon/>}>New Request</ListItem>
            <Divider />
            <List>
              {this.props.tabs.map((tab) => <TabListItem
                key={tab.guid}
                onEdit={this.handleEditTab}
                onClick={this.props.switchTab}
                tab={tab}
              />)}
            </List>
          </Paper>
        </div>
        <div style={{ paddingLeft: sideBarWidth + 10 }}>
          {this.props.currentTab ? <RequestPage tab={this.props.currentTab} /> : <AccountPage />}
          {this.state && this.state.editTab && <EditTabDialog
            tab={this.state.editTab}
            onClose={this.handleCloseEditTab}
            onDelete={this.handleDeleteEditTab}
            onSave={this.handleUpdateTab}
          />}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addTab, updateTab, deleteTab, switchTab }, dispatch);
}

function mapStateToProps (state) {
  return { tabs: state.tabs };
}
function mergeProps (stateProps, dispatchProps, ownProps) {
  const currentTab = stateProps.tabs.filter((tab) => tab.selected).shift();
  return Object.assign({}, stateProps, dispatchProps, ownProps,
    { currentTab }
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainWindow);
