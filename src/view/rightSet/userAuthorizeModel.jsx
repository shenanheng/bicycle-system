import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Transfer } from 'antd';
import Utils from '@common/utils/misc';
class userAuthorizeModel extends Component {
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = (targetKeys, direction, moveKeys) => {
    this.props.changeModel({
      type: 'authorize',
      data: targetKeys
    });
  };
  render() {
    let {
      flag,
      row,
      handleCancel,
      handleOk,
      form,
      dictionaries,
      userList,
      targetKeys
    } = this.props;
    const FormLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Modal
          cancelText="取消"
          okText="确定"
          onCancel={() => handleCancel('authorize')}
          onOk={() => handleOk('authorize')}
          title="用户授权"
          visible={flag}
          width={800}
      >
        <Form layout="horizontal"
            {...FormLayout}
        >
          <Form.Item label="角色名称：">
            <Input
                disabled
                maxLength={8}
                placeholder={Utils.codeInToName(row.roleCode, dictionaries.role)}
            />
          </Form.Item>
          <Form.Item label="选择用户">
            <Transfer
                dataSource={userList}
                filterOption={this.filterOption}
                listStyle={{ width: 200, height: 400 }}
                locale={{ searchPlaceholder: '输入用户名' }}
                onChange={this.handleChange}
                render={item => item.title}
                showSearch
                targetKeys={targetKeys}
                titles={['待选用户', '已选用户']}
            />
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
export default connect(mapStateToProps)(Form.create({})(userAuthorizeModel));
