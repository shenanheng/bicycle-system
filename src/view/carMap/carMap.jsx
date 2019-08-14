import React, { Component } from 'react';
import { Form, Select, DatePicker, Button } from 'antd';
import { connect } from 'react-redux';
import Utils from '@common/utils/misc';
import Api from '@api';
let requestParams = {
  orderTime: '', // 订单时间
  orderStartTime: '', // 订单开始时间
  orderEndTime: '', // 订单结束时间
  orderStatusCode: '' // 订单状态
};
class carMap extends Component {
  state = {
    info: {
      totalCount: 0
    }
  };
  componentDidMount() {
    this.queryList();
  }
  map = {}; // 地图对象
  resetParams = () => {
    this.props.form.resetFields();
  };
  // 处理查询
  handleQuery = () => {
    // 获取表单的值
    let fieldsValue = this.props.form.getFieldsValue();
    requestParams = {
      ...requestParams,
      ...fieldsValue
    };
    this.queryList();
  };
  // 获取城市列表
  queryList = () => {
    Api.queryBikeList(requestParams).then(res => {
      this.setState({
        info: res.data
      });
      this.renderMap(res.data);
    });
  };
  addStartEndPoint = list => {
    let gps1 = list[0].split(',');
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
    this.map.centerAndZoom(endPoint, 11);
    //添加起始图标
    let startPointIcon = new window.BMap.Icon(
      '/assets/startPoint.png',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    let bikeMarkerStart = new window.BMap.Marker(startPoint, {
      icon: startPointIcon
    });
    this.map.addOverlay(bikeMarkerStart);
    let endPointIcon = new window.BMap.Icon(
      '/assets/endPoint.png',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {
      icon: endPointIcon
    });
    this.map.addOverlay(bikeMarkerEnd);
  };
  drawDrivingRoute = list => {
    let routeList = [];
    list.forEach(item => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      routeList.push(point);
    });
    // 行驶路线
    var polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyLine);
  };
  drawServiceRoute = serviceList => {
    let servicePointist = [];
    serviceList.forEach(item => {
      let point = new window.BMap.Point(item.lon, item.lat);
      servicePointist.push(point);
    });
    // 画线
    var polyServiceLine = new window.BMap.Polyline(servicePointist, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyServiceLine);
  };
  addBikeMarker = bikeList => {
    let bikeIcon = new window.BMap.Icon(
      '/assets/bike.jpg',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    bikeList.forEach(item => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      var bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
      this.map.addOverlay(bikeMarker);
    });
  };
  addMapControl = () => {
    let map = this.map;
    // 左上角，添加比例尺
    var top_right_control = new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });
    var top_right_navigation = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });
    //添加控件和比例尺
    map.addControl(top_right_control);
    map.addControl(top_right_navigation);
    map.enableScrollWheelZoom(true);
  };
  // 渲染地图
  renderMap = res => {
    // 地图的生成
    let { bikeList, routeList, serviceList } = res;
    this.map = new window.BMap.Map('map', { enableMapClick: false });
    // 添加起始点marker
    this.addStartEndPoint(routeList);
    // 画行驶路线
    this.drawDrivingRoute(routeList);
    // 服务区路线
    this.drawServiceRoute(serviceList);
    // 添加地图中的自行车
    this.addBikeMarker(bikeList);
    // 添加地图控件
    this.addMapControl();
  };
  render() {
    let { info } = this.state;
    let { dictionaries, form } = this.props;
    return (
      <div className="cnt">
        <div className="screen-condition">
          <Form layout="inline">
            <Form.Item label="订单时间">
              {form.getFieldDecorator('orderTime', { initialValue: '' })(
                <DatePicker.RangePicker />
              )}
            </Form.Item>
            <Form.Item label="订单状态">
              {form.getFieldDecorator('orderStatusCode', {
                initialValue: ''
              })(
                <Select className="form-antd-select">
                  <Select.Option value="">全部</Select.Option>
                  {dictionaries.orderStatus.map(item => (
                    <Select.Option key={item.value}
                        value={item.value}
                    >
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                  className="ml20 mr20"
                  onClick={this.handleQuery}
                  type="primary"
              >
                查询
              </Button>
              <Button onClick={this.resetParams}>重置</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="pl20 pr20 pb20">总共{info.totalCount}辆</div>
        <div id="map"
            style={{widht:'100%',height:'500px'}}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { manageState } = state;
  const { dictionaries } = manageState;
  return {
    dictionaries
  };
}
export default connect(
  mapStateToProps,
  null
)(
  Form.create({
    onValuesChange(props, changedValues) {
      if (changedValues.hasOwnProperty('orderTime')) {
        let timeRange = changedValues['orderTime'];
        let orderStartTime = '';
        let orderEndTime = '';
        if (timeRange.length > 0) {
          orderStartTime = timeRange[0].valueOf();
          orderEndTime = timeRange[1].valueOf();
        }
        requestParams = { ...requestParams, orderStartTime, orderEndTime };
      } else {
        requestParams = { ...requestParams, ...changedValues };
      }
    }
  })(carMap)
);
