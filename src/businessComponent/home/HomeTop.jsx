import React, { Component } from 'react';
import '@less/home/homeTop.less';
import { Icon } from 'antd';
class HomeTop extends Component {
  state = {
    collapsed: false,
    iconStyle: {
      fontSize: '16px'
    }
  };
  render() {
    return (
      <div className="home-top">
        <ul className="tools">
          <li className="tool">
            <Icon className="tool-content"
                style={this.state.iconStyle}
                type="menu-fold"
            />
          </li>
        </ul>
        <ul className="tools tools-posi">
          <li className="tool">
            admin
          </li>
        </ul>
      </div>
    );
  }
}

export default HomeTop;
