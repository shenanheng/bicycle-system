import React, { Component } from 'react';
import Paging from '@common/funcComponent/Paging';
import { connect } from 'react-redux';
import Utils from '@common/utils/misc';
import { Button, Table, Message } from 'antd';
import NewRoleModel from './newRoleModel';
import SetRightModel from './setRightModel';
import UserAuthorizeModel from './userAuthorizeModel';
import Api from '@api';
let requestParams = {
  pageIndex: 1, // 当前页码
  pageSize: 15 // 每页显示的数据的条数
};
class rightSet extends Component {
  state = {
    tableObj: {},
    row: null,
    newFlag: false, // 创建角色弹框
    setFlag: false, // 设置权限的弹窗
    authorizeFlag: false, // 用户授权的弹窗
    userList: [], // 用户人员
    targetKeys: [] // 已经选择的人员(key)
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
  // 获取城市列表
  queryList = () => {
    Api.queryUserRightList(requestParams).then(res => {
      this.setState({
        tableObj: res.data
      });
    });
  };
  operate = (row, type) => {
    if (type === 'new' || type === 'set') {
      //创建角色
      this.setState({
        row,
        [`${type}Flag`]: true
      });
    } else if (type === 'authorize') {
      Api.queryUserListByUser({
        id: row.id
      }).then(res => {
        let targetKeys = [];
        let userList = res.data.map(item => {
          const data = {
            key: item.userId,
            title: item.userName,
            status: item.status
          };
          if (item.status) {
            targetKeys.push(data.key);
          }
          return data;
        });
        this.setState({
          row,
          userList,
          targetKeys,
          [`${type}Flag`]: true
        });
      });
    }
  };
  changeModel = res => {
    const { type, data } = res;
    if (type === 'set') {
      this.setState({
        row: { ...this.state.row, menus: data }
      });
    } else if (type === 'authorize') {
      this.setState({
        targetKeys: data
      });
    }
  };
  handleOk = type => {
    if (type === 'new' || type === 'set' || type === 'authorize') {
      let { row, targetKeys } = this.state;
      let form = this[`${type}Form`].props.form;
      form.validateFields((err, values) => {
        if (!err) {
          let api =
            type === 'new'
              ? Api.addDictionaries(values)
              : type === 'set'
              ? Api.editUserRight({
                  ...values,
                  id: row.id,
                  menus: row.menus
                })
              : Api.updateUserAuthorize({
                  id: row.id,
                  target: targetKeys.join(',')
                });
          api.then(res => {
            Message.success(res.msg);
            this.setState(
              {
                [`${type}Flag`]: false
              },
              () => {
                this.queryList();
              }
            );
          });
        }
      });
    }
  };
  handleCancel = type => {
    this.setState({
      [`${type}Flag`]: false
    });
  };
  render() {
    let {
      tableObj,
      newFlag,
      setFlag,
      authorizeFlag,
      row,
      userList,
      targetKeys
    } = this.state;
    const { dictionaries } = this.props;
    let self = this;
    const columns = [
      {
        title: '角色ID',
        align: 'center',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        align: 'center',
        dataIndex: 'roleCode',
        render(roleCode) {
          return Utils.codeInToName(roleCode, dictionaries.role);
        }
      },
      {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime'
      },
      {
        title: '使用状态',
        align: 'center',
        dataIndex: 'isEnableCode',
        render(isEnableCode) {
          return Utils.codeInToName(isEnableCode, dictionaries.isEnable);
        }
      },
      {
        title: '授权时间',
        align: 'center',
        dataIndex: 'authorizeTime'
      },
      {
        title: '授权人',
        align: 'center',
        dataIndex: 'authorizeUserName'
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
                  onClick={() => self.operate(reset[1], 'set')}
                  size="small"
                  type="primary"
              >
                设置权限
              </Button>
              <Button
                  className="operate-btn"
                  onClick={() => self.operate(reset[1], 'authorize')}
                  size="small"
                  type="primary"
              >
                用户授权
              </Button>
            </div>
          );
        }
      }
    ];
    return (
      <div className="cnt">
        <div className="btn-list">
          <Button
              className="operate-btn"
              icon="plus"
              onClick={() => this.operate(null, 'new')}
              type="primary"
          >
            创建角色
          </Button>
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
        {newFlag ? (
          <NewRoleModel
              flag={newFlag}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              row={row}
              wrappedComponentRef={form => (this.newForm = form)}
          />
        ) : (
          ''
        )}
        {setFlag ? (
          <SetRightModel
              changeModel={this.changeModel}
              flag={setFlag}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              row={row}
              wrappedComponentRef={form => (this.setForm = form)}
          />
        ) : (
          ''
        )}
        {authorizeFlag ? (
          <UserAuthorizeModel
              changeModel={this.changeModel}
              flag={authorizeFlag}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              row={row}
              targetKeys={targetKeys}
              userList={userList}
              wrappedComponentRef={form => (this.authorizeForm = form)}
          />
        ) : (
          ''
        )}
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
export default connect(
  mapStateToProps,
  null
)(rightSet);
