import React from 'react';
import '@less/login/login.less';
import { Form, Input, Icon, Button } from 'antd';
import Api from '@api';
import Utils from '@common/utils/misc';
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        Api.login(values).then(res => {
          const data = res.data;
          localStorage.setItem(
            'login',
            Utils.encAse192(JSON.stringify(data), 'login')
          );
          history.push('/');
        })
      }
    });
  };
  render() {
    let { form } = this.props;
    return (
      <div className="login">
        <div className="login-frame">
          <div className="login-name">业务管理系统</div>
          <Form className="login-form"
              onSubmit={this.handleSubmit}
          >
            <Form.Item>
              {form.getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }]
              })(
                <Input
                    placeholder="请输入用户名"
                    prefix={
                    <Icon style={{ color: 'rgba(0,0,0,.25)' }}
                        type="user"
                    />
                  }
                    size="large"
                />
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input
                    placeholder="请输入密码"
                    prefix={
                    <Icon style={{ color: 'rgba(0,0,0,.25)' }}
                        type="lock"
                    />
                  }
                    size="large"
                    type="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                  className="login-form-button"
                  htmlType="submit"
                  size="large"
                  type="primary"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create({})(Login);
