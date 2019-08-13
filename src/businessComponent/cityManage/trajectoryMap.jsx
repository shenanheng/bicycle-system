import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class trajectoryMap extends Component {
  shouldComponentUpdate(props) {
    //   console.log(1111,a,22,b,3,c,4,d)
    //   this.renderMap(props);
    return true;
  }
  renderMap() {
    const { userRoute, serviceArea } = this.props;
    if (userRoute.length > 0 || serviceArea.length > 0) {
      this.map = new window.BMap.Map('map');
      // 添加地图控件
      this.addMapControl();
      // 调用路线图绘制方法
      this.drawBikeRoute(userRoute);
      // 调用服务区绘制方法
      this.drwaServiceArea(serviceArea);
    }
  }
  // 添加地图控件
  addMapControl = () => {
    this.map.addControl(
      new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
    );
    this.map.addControl(
      new window.BMap.NavigationControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT
      })
    );
  };
  drawBikeRoute(list) {
    let startPoint = '';
    let endPoint = '';
    if (list.length > 0) {
      let first = list[0];
      let last = list[list.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      let startIcon = new window.BMap.Icon(
        '/assets/startPoint.png',
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(18, 42)
        }
      );
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
      this.map.addOverlay(startMarker);
      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon(
        '/assets/endPoint.png',
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(18, 42)
        }
      );
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
      this.map.addOverlay(endMarker);
      // 连接路线图
      let trackPoint = [];
      for (let i = 0; i < list.length; i++) {
        let point = list[i];
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      }
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: '#1869AD',
        strokeWeight: 3,
        strokeOpacity: 1
      });
      this.map.addOverlay(polyline);
      this.map.centerAndZoom(endPoint, 11);
    }
  }
  // 绘制服务区
  drwaServiceArea = list => {
    // 连接路线图
    let trackPoint = [];
    for (let i = 0; i < list.length; i++) {
      let point = list[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }
    // 绘制服务区
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4
    });
    this.map.addOverlay(polygon);

  };
  render() {
    this.renderMap();
    return <div id="map"
        style={{ width: '100%', height: '400px' }}
           />;
  }
}

export default connect(mapStateToProps)(trajectoryMap);
