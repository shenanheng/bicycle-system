import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './view/home';
import Login from './view/login/login';
import CarMap from './view/carMap/carMap';
import CityManage from './view/cityManage/cityManage';
import HomePage from './view/homePage/homePage';
import OrderManage from './view/orderManage/orderManage';
import orderDetails from './view/orderManage/orderDetails';
import RightSet from './view/rightSet/rightSet';
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
                        <Redirect to="/home/rightSet" />
                      </Switch>
                    </Home>
                  )}
                />

                <Route component={Login}
                    path="/login"
                />
                <Redirect to="/home" />
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

export default connect(
  mapStateToProps,
  null
)(App);
