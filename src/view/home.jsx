import { connect } from 'react-redux';
import React from 'react';
// import { Route } from 'react-router-dom';
import HomeMenu from '@business/home/HomeMenu.jsx';
import HomeTop from '@business/home/HomeTop.jsx';
import '@less/home/home.less';
import { Layout } from 'antd';
import * as userAction from '@redux/action/user.js';
import * as manageAction from '@redux/action/manage.js';
import Utils from '@common/utils/misc';
const {  Sider, Content } = Layout;
class Home extends React.Component {
  componentDidMount() {
    let { queryDic, queryMenu,queryChinaCities,queryUserInfo } = this.props;
    queryUserInfo(Utils.decUserInfo());
    queryMenu();
    queryDic();
    queryChinaCities();
  }
  render() {
    let { collapsed,userMenuList } = this.props;
    return (
      <Layout className="home">
        <Sider collapsed={collapsed}>
          <div className="home-title">
            {collapsed ? '' : '业务管理系统'}
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
const mapDispatchToProps = dispatch => ({
  queryUserInfo(data) {
    // 查询菜单列表
    dispatch(userAction.loginIn(data));
  },
  queryMenu() {
    // 查询菜单列表
    dispatch(userAction.queryUserMenu());
  },
  queryDic() {
    // 查询字典
    dispatch(manageAction.queryDic());
  },
  queryChinaCities() {
    // 查询城市
    dispatch(manageAction.queryChinaCities());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
