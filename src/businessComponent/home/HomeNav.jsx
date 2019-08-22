import React from 'react';
import { Icon } from 'antd';
import '@less/home/homeNav.less';
import { NavLink } from 'react-router-dom';

function HomeNav(props) {
  const { navList, current } = props;
  return (
    <div className="home-nav">
      <div className="home-nav-wrap">
        <div className="next">
          <Icon type="double-left" />
        </div>
        <ul className="nav-items">
          <NavLink
              className={
              current === '/home/index' ? 'nav-item active' : 'nav-item'
            }
              to="/home/index"
          >
            <Icon type="home" />
          </NavLink>
          {navList.map(item => (
            <NavLink
                className={
                current === item.key
                  ? 'nav-item is-del active'
                  : 'nav-item is-del'
              }
                key={item.key}
                to={item.key}
            >
              <span>{item.title}</span>
              <Icon className="close"
                  type="close"
              />
            </NavLink>
          ))}
        </ul>
        <div className="next">
          <Icon type="double-right" />
        </div>
        <div className="next"
            style={{ borderLeft: 'none' }}
        >
          <Icon type="down" />
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
