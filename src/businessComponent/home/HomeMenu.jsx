import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import '@less/home/homeMenu.less';
import { Link } from 'react-router-dom';

class HomeMenu extends Component {
  state = {
    collapsed: false,
    menuList: [
      {
        title: '客户服务',
        icon: 'page',
        key: '/top',
        children: [
          {
            title: '车商管理',
            key: '/home/carDealerManage',
            icon: 'car'
          },
          {
            title: '客户管理',
            key: '/home/customerManage',
            icon: 'user'
          }
        ]
      }
    ]
  };
  renderSubMenu = ({ key, icon, title, children }) => {
    return (
      <Menu.SubMenu
          key={key}
          title={
          <span>
            {icon && <Icon type={icon} />}
            <span>{title}</span>
          </span>
        }
      >
        {children &&
          children.map(item => {
            return item.children && item.children.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenuItem(item);
          })}
      </Menu.SubMenu>
    );
  };
  renderMenuItem = ({ key, icon, title }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };
  render() {
    return (
      <div className="home-menu">
        <div className="home-menu-top">众汇车服管理系统</div>
        <Menu
            defaultOpenKeys={['/top']}
            defaultSelectedKeys={['/home/carDealerManage']}
            mode="inline"
        >
          {this.state.menuList.map(item => {
            return item.children && item.children.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenuItem(item);
          })}
        </Menu>
      </div>
    );
  }
}

export default HomeMenu;
