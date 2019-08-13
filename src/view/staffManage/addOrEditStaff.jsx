import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Input, Radio, DatePicker, Button, Message } from 'antd';
import Moment from 'moment';
import Api from '@api';

let userInfo = {};
class addOrEditStaff extends Component {
  componentDidMount() {}
  handleSubmit = e => {
    const { form, match, history } = this.props;
    const { type } = match.params;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (type === 'new') {
          Api.addStaff({
            ...values,
            birthday: values.birthday.valueOf()
          }).then(res => {
            Message.success(res.msg);
            history.goBack();
          });
        }
      }
    });
  };
  render() {
    const { match, form, dictionaries } = this.props;
    const { type } = match.params;
    return (
      <div className="cnt">
        <div className="cnt-title">新增员工</div>
        <Form
            className="mt20"
            labelCol={{ span: 5 }}
            onSubmit={this.handleSubmit}
            wrapperCol={{ span: 12 }}
        >
          <Form.Item label="姓名">
            {userInfo && type === 'detail'
              ? userInfo.userName
              : form.getFieldDecorator('userName', {
                  initialValue: userInfo.userName,
                  rules: [{ required: true, message: '请输入姓名' }]
                })(<Input placeholder="请输入姓名"
                    type="text"
                   />)}
          </Form.Item>
          <Form.Item label="性别">
            {userInfo && type === 'detail'
              ? userInfo.sex === 1
                ? '男'
                : '女'
              : form.getFieldDecorator('sexCode', {
                  initialValue: userInfo.sexCode,
                  rules: [{ required: true, message: '请选择性别' }]
                })(
                  <Radio.Group>
                    {dictionaries.sex.map(item => (
                      <Radio key={item.value}
                          value={item.value}
                      >
                        {item.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
          </Form.Item>
          <Form.Item label="状态">
            {userInfo && type === 'detail'
              ? this.getState(userInfo.state)
              : form.getFieldDecorator('peopleStatus', {
                  initialValue: userInfo.peopleStatus,
                  rules: [{ required: true, message: '请选择状态' }]
                })(
                  <Select>
                    <Select.Option value={0}>咸鱼一条</Select.Option>
                    <Select.Option value={1}>风华浪子</Select.Option>
                    <Select.Option value={2}>北大才子一枚</Select.Option>
                    <Select.Option value={3}>百度FE</Select.Option>
                    <Select.Option value={4}>创业者</Select.Option>
                  </Select>
                )}
          </Form.Item>
          <Form.Item label="生日">
            {userInfo && type === 'detail'
              ? userInfo.birthday
              : form.getFieldDecorator('birthday', {
                  initialValue: Moment(userInfo.birthday),
                  rules: [{ required: true, message: '请选择日期' }]
                })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="联系地址">
            {userInfo && type === 'detail'
              ? userInfo.address
              : form.getFieldDecorator('address', {
                  initialValue: userInfo.address
                })(<Input.TextArea placeholder="请输入联系地址"
                    rows={3}
                   />)}
          </Form.Item>
          <Form.Item className="foot-btns">
            <Button className="mr20"
                htmlType="submit"
                type="primary"
            >
              提交
            </Button>
            <Button
                className="mr20"
                onClick={() => this.props.history.goBack()}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
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
export default connect(mapStateToProps)(Form.create({})(addOrEditStaff));
