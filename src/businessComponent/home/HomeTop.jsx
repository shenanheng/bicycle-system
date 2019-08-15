import React, { Component } from 'react';
import { connect } from 'react-redux';
import '@less/home/homeTop.less';
import { Dropdown, Icon, Menu } from 'antd';
import * as RootAction from '@action/root';
import Utils from '@common/utils/misc';
class HomeTop extends Component {
  state = {
    iconStyle: {
      fontSize: '16px'
    }
  };
  dropClick = (type) => {
    if(type === 'exit'){
      // 退出登录
      Utils.signOut();
    }
  }
  render() {
    const { loginInfo } = this.props;
    const dropList = () => (
      <Menu className="drop-list">
        <Menu.Item className="drop-list-item"
            onClick={()=>this.dropClick('info')}
        >基本信息</Menu.Item>
        <Menu.Item className="drop-list-item"
            onClick={()=>this.dropClick('password')}
        >修改密码</Menu.Item>
        <hr className="line" />
        <Menu.Item className="drop-list-item"
            onClick={()=>this.dropClick('exit')}
        >退出登录</Menu.Item>
      </Menu>
    );

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
          <li className="tool">
            <Dropdown overlay={dropList}>
              <div className="cursor">
                {loginInfo.userName} <Icon type="down" />
              </div>
            </Dropdown>
          </li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { userState } = state;
  const { loginInfo } = userState;
  return {
    loginInfo
  };
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
  mapStateToProps,
  mapDispatchToProps
)(HomeTop);
