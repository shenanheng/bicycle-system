import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@less/home/homeTop.less';
import { Icon } from 'antd';
import * as RootAction from '@action/root';

class HomeTop extends Component {
  state = {
    iconStyle: {
      fontSize: '16px'
    }
  };
  render() {
    return (
      <div className="home-top">
        <ul className="tools">
          <li className="tool"
              onClick={() => this.props.toolClick('collapse')}
          >
            <Icon
                className="tool-content"
                style={this.state.iconStyle}
                type="menu-fold"
            />
          </li>
        </ul>
        <ul className="tools tools-posi">
          <li className="tool">admin</li>
        </ul>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    toolClick(type) {
      if (type === 'collapse') {
        dispatch(RootAction.changeMenuCollapsed());
      }
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(HomeTop);
