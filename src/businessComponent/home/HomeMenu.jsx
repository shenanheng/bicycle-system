import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class HomeMenu extends Component {
  static defaultProps = {
    list: []
  };
  state={
    currentMenu:'/home/index'
  }
  handleMenu =(e) => {
    this.setState({
      currentMenu:e.key
    })
  }
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
  renderMenuItem = ({ path, icon, title }) => {
    return (
      <Menu.Item key={path}>
        <Link to={path}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };
  render() {
    let { list } = this.props;
    const {currentMenu} = this.state;
    return (
      <Menu
          mode="inline"
          onClick={this.handleMenu}
          selectedKeys={[currentMenu]}
          theme="dark"
      >
        {list.map(item => {
          return item.children && item.children.length > 0
            ? this.renderSubMenu(item)
            : this.renderMenuItem(item);
        })}
      </Menu>
    );
  }
}
export default HomeMenu;
