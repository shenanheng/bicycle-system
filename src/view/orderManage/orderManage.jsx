import React, { Component } from 'react';
import Paging from '@common/funcComponent/Paging';
import { Form, Select, Cascader, DatePicker, Button, Table } from 'antd';
import { connect } from 'react-redux';
import Utils from '@common/utils/misc';
import Api from '@api';
let requestParams = {
  cityCode: '', // 城市
  cityName: '', // 城市的名字
  orderTime: '', // 订单时间
  orderStatusCode: '', // 订单状态
  pageIndex: 1, // 当前页码
  pageSize: 15 // 每页显示的数据的条数
};
class orderManage extends Component {
  state = {
    tableObj: {}
  };
  componentDidMount() {
    this.queryList();
  }
  pageChange = pageObj => {
    // 调用查询的接口
    requestParams = {
      ...requestParams,
      ...pageObj
    };
    this.queryList();
  };
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
    Api.queryOrderManageList(requestParams).then(res => {
      this.setState({
        ...this.state,
        tableObj: res.data
      });
    });
  };
  operate = (row, type) => {
    if(type === 'see') { // 进入订单详情
      this.props.history.push(`/home/orderDetails/${row.id}`)
    }else if(type === 'order'){ // 结束订单

    }
  };
  render() {
    let { dictionaries, provinceCityAreaTree, form } = this.props;
    let { tableObj } = this.state;
    let self = this;
    const columns = [
      {
        title: '订单编号',
        width: 120,
        align: 'center',
        dataIndex: 'id'
      },
      {
        title: '车辆编号',
        width: 120,
        align: 'center',
        dataIndex: 'carNum'
      },
      {
        title: '用户名',
        width: 100,
        align: 'center',
        dataIndex: 'userName'
      },
      {
        title: '手机号',
        width: 120,
        align: 'center',
        dataIndex: 'phone'
      },
      {
        title: '里程',
        width: 100,
        align: 'center',
        dataIndex: 'distance',
        render(distance) {
          return `${(distance / 1000).toFixed(2)}km`;
        }
      },
      {
        title: '行驶时长',
        width: 100,
        align: 'center',
        dataIndex: 'totalTime'
      },
      {
        title: '状态',
        width: 100,
        align: 'center',
        dataIndex: 'orderStatusCode',
        render(orderStatusCode) {
          return Utils.codeInToName(orderStatusCode, dictionaries.orderStatus);
        }
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        align: 'center',
        width: 180,
        render(startTime) {
          return Utils.formatDate(startTime, true);
        }
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        align: 'center',
        width: 180,
        render(endTime) {
          return Utils.formatDate(endTime, true);
        }
      },
      {
        title: '订金金额',
        width: 120,
        align: 'center',
        dataIndex: 'advancePay'
      },
      {
        title: '实付金额',
        width: 120,
        align: 'center',
        dataIndex: 'actualPay'
      },
      {
        title: '操作',
        width: 300,
        align: 'center',
        fixed: 'right',
        render(...reset) {
          return (
            <div className="table-operate">
              <Button
                  className="operate-btn"
                  onClick={() => self.operate(reset[1], 'see')}
                  size="small"
                  type="primary"
              >
                查看
              </Button>
              <Button className="operate-btn"
                  onClick={() => self.operate(reset[1], 'order')}
                  size="small"
                  type="primary"
              >
                结束订单
              </Button>
            </div>
          );
        }
      }
    ];
    return (
      <div className="cnt">
        <div className="screen-condition">
          <Form layout="inline">
            <Form.Item label="城市">
              {form.getFieldDecorator('cityCode', { initialValue: [] })(
                <Cascader
                    className="form-antd-cascader"
                    options={provinceCityAreaTree}
                    placeholder="请选择城市"
                />
              )}
            </Form.Item>
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
        <Table
            columns={columns}
            dataSource={tableObj.list}
            pagination={false}
            rowKey="id"
            scroll={{ x: 1680 }}
        />
        <Paging
            className="table-page"
            pageChange={this.pageChange}
            total={tableObj.totalCount}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { manageState } = state;
  const { dictionaries, provinceCityAreaTree } = manageState;
  return {
    dictionaries,
    provinceCityAreaTree
  };
}
export default connect(
  mapStateToProps,
  null
)(
  Form.create({
    onValuesChange(props, changedValues) {
      if (changedValues.hasOwnProperty('cityCode')) {
        const { ids: cityCode, names: cityName } = Utils.splieIdCode(
          changedValues['cityCode'],
          '-'
        );
        requestParams = { ...requestParams, cityCode, cityName };
      } else {
        requestParams = { ...requestParams, ...changedValues };
      }
    }
  })(orderManage)
);
