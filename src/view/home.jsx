import { connect } from 'react-redux';
import React from 'react';
import { Route } from 'react-router-dom';
import HomeMenu from '@business/home/HomeMenu.jsx';
import HomeTop from '@business/home/HomeTop.jsx';
import CarDealerManage from '@view/carDealer/manage/carDealerManage.jsx';
import CustomerManage from '@view/customer/customerManage.jsx';
import '@less/home/home.less';
import Actions from '@redux/action/index.js';
const mapStateToProps = state => ({
  a: state
});
const mapDispatchToProps = dispatch => ({
  queryDictionaryTablesM: data => dispatch(Actions.queryDictionaryTables(data))
});
class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {/* 顶部 */}
        <HomeTop />
        {/* 左边侧栏 */}
        <HomeMenu />
        {/* 内容部分 */}
        <div className="home-content"
            id="aaa"
        >
          <div className="home-content-wrap">
            <Route component={CarDealerManage}
                path="/home/carDealerManage"
            />
            <Route component={CustomerManage}
                path="/home/customerManage"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
