import React, { Component } from 'react';
import Paging from '@common/funcComponent/Paging';
import { Form, Select, Cascader, Button, Table,Modal } from 'antd';
import { connect } from 'react-redux';
import Utils from '@common/utils/misc';
import Api from '@api';
let requestParams = {
  cityCode: '', // 城市
  cityName: '', // 城市的名字
  carModeCode: '', // 用车模式
  operateCode: '', // 运营模式
  authorizeStateCode: '', // 加盟商授权状态
  pageIndex: 1, // 当前页码
  pageSize: 15 // 每页显示的数据的条数
};
class cityManage extends Component {
  state = {
    cityManageObj: {},
    openCityFlag: true // 开通城市弹出框
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
    requestParams.cityCode = '';
    requestParams.cityName = '';
  };
  // 处理查询
  handleQuery = () => {
    // 获取表单的值
    let fieldsValue = this.props.form.getFieldsValue();
    requestParams = {
      ...requestParams,
      ...fieldsValue,
      cityCode: requestParams.cityCode,
      cityName: requestParams.cityName
    };
    this.queryList();
  };
  // 获取城市列表
  queryList = () => {
    Api.queryCityManageList(requestParams).then(res => {
      this.setState({
        ...this.state,
        cityManageObj: res.data
      });
    });
  };
  render() {
    let { dictionaries, provinceCityAreaTree, form } = this.props;
    let { cityManageObj, openCityFlag } = this.state;
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'carModeCode',
        render(carModeCode) {
          return Utils.codeInToName(carModeCode, dictionaries.carMode);
        }
      },
      {
        title: '营运模式',
        dataIndex: 'operateCode',
        render(operateCode) {
          return Utils.codeInToName(operateCode, dictionaries.operateMode);
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchiseeName'
      },
      {
        title: '城市管理员',
        dataIndex: 'cityAdmins',
        render(arr) {
          return arr
            .map(item => {
              return item.userName;
            })
            .join(',');
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'openTime'
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        render(updateTime) {
          return Utils.formatDate(updateTime, true);
        }
      },
      {
        title: '操作人',
        dataIndex: 'sysUserName'
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
            <Form.Item label="用车模式">
              {form.getFieldDecorator('carModeCode', { initialValue: '' })(
                <Select className="form-antd-select">
                  <Select.Option value="">全部</Select.Option>
                  {dictionaries.carMode.map(item => (
                    <Select.Option key={item.value}
                        value={item.value}
                    >
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="运营模式">
              {form.getFieldDecorator('operateCode', { initialValue: '' })(
                <Select className="form-antd-select">
                  <Select.Option value="">全部</Select.Option>
                  {dictionaries.operateMode.map(item => (
                    <Select.Option key={item.value}
                        value={item.value}
                    >
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="加盟商授权状态">
              {form.getFieldDecorator('authorizeStateCode', {
                initialValue: ''
              })(
                <Select className="form-antd-select">
                  <Select.Option value="">全部</Select.Option>
                  {dictionaries.authorizeState.map(item => (
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
        <div className="btn-list">
          <Button type="primary">开通城市</Button>
        </div>
        <Table
            columns={columns}
            dataSource={cityManageObj.list}
            pagination={false}
            rowKey="id"
        />
        <Paging
            className="table-page"
            pageChange={this.pageChange}
            total={cityManageObj.totalCount}
        />
        {/* 开通城市 */}
        <Modal
            cancelText="取消"
            okText="确定"
            title="开通城市"
            visible={openCityFlag}
        >

        </Modal>
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
  })(cityManage)
);
