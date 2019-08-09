import { connect } from 'react-redux';
import React from 'react';
// import { Route } from 'react-router-dom';
import HomeMenu from '@business/home/HomeMenu.jsx';
import HomeTop from '@business/home/HomeTop.jsx';
import '@less/home/home.less';
import { Layout } from 'antd';
const {  Sider, Content } = Layout;
class Home extends React.Component {
  render() {
    let { collapsed,userMenuList } = this.props;
    return (
      <Layout className="home">
        <Sider collapsed={collapsed}>
          <div className="home-title">
            {collapsed ? '' : '众汇车服管理系统'}
          </div>
          <HomeMenu list={userMenuList} />
        </Sider>
        <Layout>
          <HomeTop />
          <Content className="home-content">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { rootState,userState } = state;
  const { collapsed } = rootState;
  const { userMenuList } = userState;
  return {
    collapsed,
    userMenuList
  };
}
export default connect(
  mapStateToProps,
  null
)(Home);
