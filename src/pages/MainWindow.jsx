import url from 'url';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTab, switchTab, updateTab } from '../actions.js';

/*
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
*/
import Tabs from 'react-draggable-tab/lib/components/Tabs.js';
import Tab from 'react-draggable-tab/lib/components/Tab.js';

import RequestPage from './RequestPage.jsx'

class MainWindow extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    tab: PropTypes.string.isRequired
  };

  handleTabAddButtonClick = () => {
    this.props.addTab();
  }

  render () {
    const tabs = this.props.tabs.map((tab) => {
      return (
        <Tab key={tab.guid} value={tab.guid} title={tab.label} >
          <RequestPage tab={tab} />
        </Tab>
      );
    });
    return (
      <div>
        <br />
        <Tabs
          value={this.props.currentTab.guid}
          onChange={this.props.switchTab}
          onTabAddButtonClick={this.handleTabAddButtonClick}
          tabs={tabs}
        />
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addTab, updateTab, switchTab }, dispatch);
}

function mapStateToProps (state) {
  return { tabs: state.tabs };
}
function mergeProps (stateProps, dispatchProps, ownProps) {
  const currentTab = stateProps.tabs.filter((tab) => tab.selected).shift();
  return Object.assign({}, stateProps, dispatchProps, ownProps,
    { currentTab, tab: currentTab.guid }
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainWindow);
