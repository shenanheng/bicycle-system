import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tree, Form, Input, Select } from 'antd';
import Utils from '@common/utils/misc';
class setRightModel extends Component {
  onCheck = checkedKeys => {
    this.props.changeModel({
      type: 'set',
      data: checkedKeys.join(',')
    });
  };
  renderTreeNodes = (data, key = '') => {
    return data.map(item => {
      let parentKey = key + item.path;
      if (item.children) {
        return (
          <Tree.TreeNode
              className="op-role-tree"
              dataRef={item}
              key={parentKey}
              title={item.title}
          >
            {this.renderTreeNodes(item.children, parentKey)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={parentKey}
          {...item}
             />;
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
      userMenuList
    } = this.props;
    const FormLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Modal
          cancelText="取消"
          okText="确定"
          onCancel={() => handleCancel('set')}
          onOk={() => handleOk('set')}
          title="权限设置"
          visible={flag}
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
          <Form.Item label="状态">
            {form.getFieldDecorator('isEnableCode', {
              initialValue: row.isEnableCode
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
          <Form.Item label="菜单列表">
            <Tree
                checkable
                checkedKeys={row.menus.split(',')}
                defaultExpandAll
                onCheck={checkedKeys => this.onCheck(checkedKeys)}
            >
              {this.renderTreeNodes(userMenuList)}
            </Tree>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  const { manageState, userState } = state;
  const { dictionaries } = manageState;
  const { userMenuList } = userState;
  return {
    dictionaries,
    userMenuList
  };
}
export default connect(mapStateToProps)(Form.create({})(setRightModel));
