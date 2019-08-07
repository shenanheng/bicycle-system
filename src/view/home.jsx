import { connect } from 'react-redux';
import React from 'react';
// import { Route } from 'react-router-dom';
import HomeMenu from '@business/home/HomeMenu.jsx';
import HomeTop from '@business/home/HomeTop.jsx';
import '@less/home/home.less';
import Actions from '@redux/action/index.js';
import Api from '@api';
import { Layout } from 'antd';
const {  Footer, Sider, Content } = Layout;
class Home extends React.Component {
  state = {
    menuList: []
  };
  componentDidMount() {
    // 查询首页菜单
    Api.queryMenuByUser().then(res => {
      this.setState({
        menuList: res.data
      });
    });
  }
  render() {
    let { collapsed } = this.props;
    let { menuList } = this.state;
    return (
      <Layout className="home">
        <Sider collapsed={collapsed}>
          <div className="home-title">
            {collapsed ? '' : '众汇车服管理系统'}
          </div>
          <HomeMenu list={menuList} />
        </Sider>
        <Layout>
          <HomeTop />
          <Content className="home-content">
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  const { rootState } = state;
  const { collapsed } = rootState;
  return {
    collapsed
  };
}
const mapDispatchToProps = dispatch => ({
  queryDictionaryTablesM: data => dispatch(Actions.queryDictionaryTables(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
