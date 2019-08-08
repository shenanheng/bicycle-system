import React, { Component } from 'react';
import { Form, Select } from 'antd';

class cityManage extends Component {
  render() {
    return (
      <div className="cnt">
        <div className="screen-condition">
          <Form layout="inline">
            <Form.Item label="城市">
              <Select
                  defaultValue="lucy"
              >
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option disabled
                    value="disabled"
                >
                  Disabled
                </Select.Option>
                <Select.Option value="Yiminghe">yiminghe</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default cityManage;
