import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Descriptions, Button } from 'antd';
import Utils from '@common/utils/misc';
import Api from '@api';
class orderDetails extends Component {
  state = {
    info: {
      basic: {}, // 基础数据
      trajectory: {} // 行驶轨迹
    }
  };
  componentDidMount() {
    this.queryDetails();
  }
  // 获取订单详情
  queryDetails = () => {
    Api.queryOrderDetails().then(res => {
      this.setState({
        ...this.state,
        info: res.data
      });
    });
  };
  render() {
    const { dictionaries,history } = this.props;
    const { info } = this.state;
    return (
      <div className="cnt">
        <div className="details-info">
          <Descriptions bordered
              className="mt20"
              title="基础信息"
          >
            <Descriptions.Item label="订单编号">
              {info.basic.id}
            </Descriptions.Item>
            <Descriptions.Item label="车辆编号">
              {info.basic.carNum}
            </Descriptions.Item>
            <Descriptions.Item label="用车模式">
              {Utils.codeInToName(
                info.basic.carModeCode,
                dictionaries.orderStatus
              )}
            </Descriptions.Item>
            <Descriptions.Item label="用户姓名">
              {info.basic.userName}
            </Descriptions.Item>
            <Descriptions.Item label="手机号码">
              {info.basic.phone}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions bordered
              className="mt20"
              title="行驶轨迹"
          >
            <Descriptions.Item label="行程起点">
              {info.trajectory.startLocation}
            </Descriptions.Item>
            <Descriptions.Item label="行程终点">
              {info.trajectory.endLocation}
            </Descriptions.Item>
            <Descriptions.Item label="行驶里程">{`${(
              info.trajectory.distance / 1000
            ).toFixed(2)}km`}</Descriptions.Item>
          </Descriptions>
        </div>
        <div></div>
        <div className="foot-btns">
          <Button onClick={history.goBack}>返回</Button>
        </div>
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
export default connect(mapStateToProps)(orderDetails);
