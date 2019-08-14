import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { Form, Input, Select } from 'antd';

class newRoleModel extends Component {
  render() {
    let { flag, handleCancel, handleOk, form, dictionaries } = this.props;
    const formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 16}
    };
    return (
      <Modal
          cancelText="取消"
          okText="确定"
          onCancel={() => handleCancel('new')}
          onOk={() => handleOk('new')}
          title="创建角色"
          visible={flag}
      >
        <Form layout="horizontal"
            {...formItemLayout}
        >
          <Form.Item label="角色名称">
            {form.getFieldDecorator('roleLabel', {
              initialValue: '',
              rules: [{ required: true, message: '请输入角色名称' }]
            })(<Input placeholder="请输入角色名称"
                type="text"
               />)}
          </Form.Item>
          <Form.Item label="状态">
            {form.getFieldDecorator('isEnableCode', {
              initialValue: 1
            })(
              <Select>
                {dictionaries.isEnable.map(item => (
                  <Select.Option key={item.value}
                      value={item.value}
                  >
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
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
export default connect(mapStateToProps)(Form.create({})(newRoleModel));
