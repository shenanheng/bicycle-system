import React, { Component } from 'react';
import utils from '@common/utils/misc';
import Api from '@api';
import Paging from '@common/funcComponent/Paging';
import { Input, Select, DatePicker, Button, Table,Icon } from 'antd';
class customerManage extends Component {
  state = {
    list: [],
    requestParams: {
      // 请求的参数
      condition: null, // 输入参数查询
      wbtBigZon: null, // 所在大区
      createTime: null, // 创建时间不用于后台接收
      startTime: null, // 创建时间开始时间
      endTime: null, // 创建时间结束时间
      userId: null, // 客户经理Id
      pageIndex: 1, // 当前页码
      pageSize: 15 // 每页显示的数据的条数
    },
    tableObj: {
      // 列表对象
    }
  };
  componentDidMount() {
    this.queryList(); // 查询客户数据
  }
  // 客户列表查询
  queryList() {
    Api.queryCustomerList(utils.reMoveNull(this.state.requestParams)).then(
      res => {
        this.setState({
          tableObj: res.data
        });
      }
    );
  }
  onChange(event, type) {
    this.setState({
      requestParams: {
        ...this.state.requestParams,
        [type]: event.target.value
      }
    });
  }
  changeTime = dates => {
    let startTime = null;
    let endTime = null;
    if (dates.length > 0) {
      startTime = dates[0].valueOf();
      endTime = dates[1].valueOf();
    }
    this.setState({
      requestParams: {
        ...this.state.requestParams,
        startTime,
        endTime
      }
    });
  };
  operate = (row, type) => {
    if (type === 'addCustomer') {
      this.addCustomerModalVisible = true;
    } else if (type === 'query') {
      // 查询列表
      this.queryList();
    } else if (type === 'reset') {
      // 重置参数
      this.resetParams();
      this.queryList();
    } else if (type === 'edit') {
      // 编辑
      // this.$router.push({
      //   path: `/home/editCustomerInfo/${row.id}`
      // });
    } else if (type === 'see') {
      // 查看
      // this.$router.push({
      //   path: `/home/customerRelevant/${row.id}/${row.managerType}`
      // });
    }
  };
  pageChange = pageObj => {
    // 调用查询的接口
    this.setState(
      {
        requestParams: {
          ...this.state.requestParams,
          ...pageObj
        }
      },
      () => {
        this.queryList();
      }
    );
  };
  render() {
    let self = this;
    const { tableObj } = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'name',
        key: 'name',
        width:80,
        render: (...reset) => reset[2] + 1
      },
      {
        title: '客户编号',
        dataIndex: 'customerNum',
        key: 'customerNum'
      },
      {
        title: '客户姓名',
        dataIndex: 'customerName',
        width:100,
        key: 'customerName'
      },
      {
        title: '身份证号',
        dataIndex: 'certificateNum',
        width:120,
        key: 'certificateNum'
      },
      {
        title: '手机号码',
        dataIndex: 'contactPhone',
        width:120,
        key: 'contactPhone'
      },
      {
        title: '客户经理',
        dataIndex: 'userName',
        width:100,
        key: 'userName'
      },
      {
        title: '所属大区',
        dataIndex: 'groupName',
        key: 'groupName'
      },
      {
        title: '创建时间',
        dataIndex: 'createdStamp',
        width:180,
        key: 'createdStamp',
        render: (...reset) => utils.formatDate(reset[0], true)
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width:300,
        key: 'operation',
        render: (text, recode) => {
          function showFind() {
            if (utils.showButtonFlag('cs_customer_manage_customer_details')) {
              return (
                <span
                    className="btns seeOrEdit"
                    onClick={self.operate(recode, 'see')}
                >
                  <Icon type="search" />
                  <span className="text">查看</span>
                </span>
              );
            }
            return '';
          }
          function showEdit(recode) {
            if (
              utils.showButtonFlag('cs_customer_manage_edit_user_customer') ||
              (recode.managerType === 1 && recode.userId === '1')
            ) {
              return (
                <span
                    className="btns seeOrEdit"
                    onClick={self.operate(recode, 'see')}
                >
                <Icon type="search" />
                  <span className="text">编辑</span>
                </span>
              );
            }
            return '';
          }
          return (
            <div className="table-operate">
              {showFind()}
              {showEdit(recode)}
            </div>
          );
        }
      }
    ];
    return (
      <div className="content-list">
        <div className="query-criteria">
          <div className="criteria-item">
            <Input
                allowClear
                className="long-input"
                onChange={e => this.onChange(e, 'condition')}
                placeholder="请输入客户编号、姓名、身份证号码、手机号码"
                value={this.state.requestParams.condition}
            />
          </div>
          <div className="criteria-item">
            <label>所在大区：</label>
            <Select
                allowClear
                optionFilterProp="children"
                placeholder="Select a person"
                showSearch
                style={{ width: 200 }}
            >
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
            </Select>
          </div>
          <div className="criteria-item">
            <label>客户经理：</label>
            <Select
                allowClear
                optionFilterProp="children"
                placeholder="Select a person"
                showSearch
                style={{ width: 200 }}
            >
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
            </Select>
          </div>
          <div className="criteria-item">
            <label>创建时间：</label>
            <DatePicker.RangePicker allowClear
                onChange={this.changeTime}
            />
          </div>
          <Button
              className="ml20"
              click="operate(null,'query')"
              size="small"
              type="primary"
          >
            查询
          </Button>
          <Button
              className="ml20"
              click="operate(null,'reset')"
              size="small"
              type="primary"
          >
            重置
          </Button>
        </div>
        <div className="table-list">
          <div className="oper-btns">
            <Button
                click="operate(null,'addCustomer')"
                size="small"
                type="primary"
                v-if="utils.showButtonFlag('cs_customer_manage_add_customer')"
            >
              新增客户
            </Button>
          </div>
          <Table
              bordered
              className="table"
              columns={columns}
              dataSource={tableObj.result}
              pagination={false}
              rowKey="id"
          />
          <Paging
              pageChange={this.pageChange}
              total={tableObj.totalCount}
          />
        </div>
      </div>
    );
  }
}

export default customerManage;
