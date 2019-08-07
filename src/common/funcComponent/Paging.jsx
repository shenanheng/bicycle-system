import { Pagination } from 'antd';
import React, { Component } from 'react';

class Paging extends Component {
  static defaultProps = {
    pageSize: 15,
    pageSizeOptions: ['15', '30', '45', '60']
  };
  state = {
    currentPage: 1
  };
  onChange = page => {
    this.setState(
      {
        currentPage: page
      },
      () => {
        this.props.pageChange({ pageIndex: page });
      }
    );
  };
  onShowSizeChange = (...reset) => {
    this.setState(
      {
        currentPage: 1
      },
      () => {
        this.props.pageChange({ pageSize: reset[1], pageIndex: 1 });
      }
    );
  };
  showTotal = total => {
    return <div>共 {total} 条</div>;
  };
  render() {
    let { currentPage } = this.state;
    let { total, pageSizeOptions, pageSize } = this.props;
    return (
      <Pagination
          className="table-page"
          current={currentPage}
          defaultPageSize={pageSize}
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
          pageSizeOptions={pageSizeOptions}
          showQuickJumper
          showSizeChanger
          showTotal={this.showTotal}
          total={total}
      />
    );
  }
}

export default Paging;
