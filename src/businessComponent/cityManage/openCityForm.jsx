import React, { Component } from 'react';
import { Form, Select, Cascader,Button } from 'antd';
import { connect } from 'react-redux';
import Utils from '@common/utils/misc';
let requestParams = {
  cityCode: '', // 城市
  cityName: '', // 城市的名字
  carModeCode: '', // 用车模式
  operateCode: '', // 运营模式
  authorizeStateCode: '' // 加盟商授权状态
};
class openCityForm extends Component {
  render() {
    let { dictionaries, provinceCityAreaTree, form } = this.props;
    return (
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
export default connect(mapStateToProps)(
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
  })(openCityForm)
);
