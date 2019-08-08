import React from 'react';
import { connect } from 'react-redux';
import * as userAction from '@redux/action/user.js';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './view/home';
import Login from './view/login';
import CarMap from './view/carMap';
import CityManage from './view/cityManage';
import HomePage from './view/homePage';
import OrderManage from './view/orderManage';
import RightSet from './view/rightSet';
import StaffManage from './view/staffManage';
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
    this.props.queryMenu();
  }
  render() {
    let { userMenuList } = this.props;
    let {sub} = this.state;
    return (
      <Router>
        <Switch>
          <Route
              path="/"
              render={() => (
              <div style={{ width: '100%', height: '100%' }}>
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
                        </Switch>
                      </Home>
                    )}
                  />

                  <Route component={Login}
                      path="/login"
                  />
                </Switch>
              </div>
            )}
          />
          <Redirect to="/home/index" />
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
    dispatch(userAction.queryUserMenu());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
