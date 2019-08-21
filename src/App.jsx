import React from 'react';
import loadable from '@loadable/component'
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
const Home =  loadable(()=>import('./view/home'));
const Login =  loadable(()=>import('./view/login/login'));
const CarMap =  loadable(()=>import('./view/carMap/carMap'));
const CityManage =  loadable(()=>import('./view/cityManage/cityManage'));
const HomePage =  loadable(()=>import('./view/homePage/homePage'));
const OrderManage =  loadable(()=>import('./view/orderManage/orderManage'));
const orderDetails =  loadable(()=>import('./view/orderManage/orderDetails'));
const RightSet =  loadable(()=>import('./view/rightSet/rightSet'));
const StaffManage =  loadable(()=>import('./view/staffManage/staffManage'));
const AddOrEditStaff =  loadable(()=>import('./view/staffManage/addOrEditStaff'));

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
                        <Redirect to="/home/index" />
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
