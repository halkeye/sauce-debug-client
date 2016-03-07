import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchTab } from '../actions.js';

import 'roboto-font/css/fonts.css';
import 'material-design-iconic-font/dist/css/material-design-iconic-font.css';
import 'muicss/lib/css/mui.css';

class TabBarItem extends React.Component {
  onClick = () => {
    this.props.switchTab(this.props.guid);
  }

  render () {
    return (
      <li className={this.props.isSelected ? 'mui--is-active' : ''}>
        <a onClick={this.onClick}>{this.props.label}</a>
      </li>
    );
  }
}

TabBarItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  guid: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired
};

class TabBar extends React.Component {
  render () {
    return (
      <ul className='mui-tabs__bar'>
        {this.props.tabs.map((tab) => {
          return <TabBarItem isSelected={tab.guid === this.props.tab} key={tab.guid} {...tab} switchTab={this.props.switchTab} />;
        })}
      </ul>
    );
  }
}

TabBar.propTypes = {
  tab: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  switchTab: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ switchTab }, dispatch);
}

function mapStateToProps (state) {
  return {
    tab: state.tab,
    tabs: state.tabs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
