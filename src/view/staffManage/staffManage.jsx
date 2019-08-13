import React, { Component } from 'react';
import Paging from '@common/funcComponent/Paging';
import { Button, Table, Modal, Icon, Message } from 'antd';
import { connect } from 'react-redux';
import Utils from '@common/utils/misc';
import Api from '@api';
let requestParams = {
  pageIndex: 1, // 当前页码
  pageSize: 15 // 每页显示的数据的条数
};
class staffManage extends Component {
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
  // 获取员工列表
  queryList = () => {
    Api.querystaffManageList(requestParams).then(res => {
      this.setState({
        tableObj: res.data
      });
    });
  };
  operate = (row, type) => {
    let self = this;
    if (type === 'new') {
      this.props.history.push('/home/newStaff/new')
    } else if (type === 'see') {
      // this.props.history.push(`/home/orderDetails/${row.id}`);
    } else if (type === 'edit') {
      this.props.history.push(`/home/newStaff/edit/${row.staffId}`)
      // 编辑
    } else if (type === 'del') {
      // 删除
      Modal.confirm({
        title: '您确定删除该项?',
        icon: <Icon style={{ color: 'red' }}
            type="exclamation-circle"
              />,
        okText: '确定',
        cancelText: '取消',
        onOk() {
          Api.delStaff({
            id: row.staffId
          }).then(res => {
            Message.success(res.msg);
            self.queryList();
          });
        }
      });
    }
  };
  render() {
    const { tableObj } = this.state;
    const { dictionaries } = this.props;
    let self = this;
    const columns = [
      {
        title: 'id',
        width: 120,
        align: 'center',
        dataIndex: 'staffId'
      },
      {
        title: '用户名',
        width: 100,
        align: 'center',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        width: 100,
        align: 'center',
        dataIndex: 'sexCode',
        render(sexCode) {
          return Utils.codeInToName(sexCode, dictionaries.sex);
        }
      },
      {
        title: '状态',
        width: 100,
        align: 'center',
        dataIndex: 'peopleStatus',
        render(peopleStatus) {
          let config = {
            0: '咸鱼一条',
            1: '风华浪子',
            2: '北大才子',
            3: '百度FE',
            4: '创业者'
          };
          return config[peopleStatus];
        }
      },
      {
        title: '爱好',
        width: 100,
        align: 'center',
        dataIndex: 'hobby'
      },
      {
        title: '婚姻状况',
        width: 100,
        align: 'center',
        dataIndex: 'marriageStatus',
        render(marriageStatus) {
          return Utils.codeInToName(marriageStatus, dictionaries.marriage);
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        align: 'center',
        width: 180
      },
      {
        title: '地址',
        dataIndex: 'address',
        align: 'center'
      },
      {
        title: '早起时间',
        width: 120,
        align: 'center',
        dataIndex: 'morningTime'
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
              <Button
                  className="operate-btn"
                  onClick={() => self.operate(reset[1], 'edit')}
                  size="small"
                  type="primary"
              >
                编辑
              </Button>
              <Button
                  className="operate-btn"
                  onClick={() => self.operate(reset[1], 'del')}
                  size="small"
                  type="danger"
              >
                删除
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
            创建员工
          </Button>
        </div>
        <Table
            columns={columns}
            dataSource={tableObj.list}
            pagination={false}
            rowKey="staffId"
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
  const { dictionaries } = manageState;
  return {
    dictionaries
  };
}
export default connect(
  mapStateToProps,
  null
)(staffManage);
