import React from 'react';
import { connect } from 'react-redux';
import * as userAction from '@redux/action/user.js';
import * as manageAction from '@redux/action/manage.js';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './view/home';
import Login from './view/login';
import CarMap from './view/carMap';
import CityManage from './view/cityManage/cityManage';
import HomePage from './view/homePage';
import OrderManage from './view/orderManage/orderManage';
import orderDetails from './view/orderManage/orderDetails';
import RightSet from './view/rightSet';
import StaffManage from './view/staffManage/staffManage';
import AddOrEditStaff from './view/staffManage/addOrEditStaff';
class App extends React.Component {
  state = {
    sub: {
      CarMap,
      CityManage,
      HomePage,
      OrderManage,
      RightSet,
      StaffManage
    }
  };
  componentDidMount() {
    let { queryDic, queryMenu,queryChinaCities } = this.props;
    queryMenu();
    queryDic();
    queryChinaCities();
  }
  render() {
    let { userMenuList } = this.props;
    let { sub } = this.state;
    return (
      <Router>
        <Switch>
          <Route
              path="/"
              render={() => (
              <Switch>
                <Route
                    path="/home"
                    render={() => (
                    <Home>
                      <Switch>
                        {userMenuList.map((item, index) => (
                          <Route
                              component={sub[item.component]}
                              key={item + index}
                              path={item.path}
                          />
                        ))}
                        <Route
                            component={orderDetails}
                            path="/home/orderDetails/:id"
                        />
                        <Route
                            component={AddOrEditStaff}
                            path="/home/newStaff/:type/:id"
                        />
                         <Route
                             component={AddOrEditStaff}
                             path="/home/newStaff/:type"
                         />
                        <Redirect to="/home/staff" />
                      </Switch>
                    </Home>
                  )}
                />

                <Route component={Login}
                    path="/login"
                />
              </Switch>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  const { userState } = state;
  const { userMenuList } = userState;
  return {
    userMenuList
  };
}
const mapDispatchToProps = dispatch => ({
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
)(App);
