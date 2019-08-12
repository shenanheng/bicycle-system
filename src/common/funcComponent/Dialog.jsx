import React, { Component } from 'react';
import {Modal} from 'antd';
class Dialog extends Component {
    static defaultProps = {
        okText:'确定',
        cancelText:'取消'
    }
    render() {
    let {basicTitle,flag,okText,cancelText,contentComponent} = this.props;

        return (
            <Modal
                cancelText={cancelText}
                okText={okText}
                title={basicTitle}
                visible={flag}
            >
                <contentComponent></contentComponent>
            </Modal>
        );
    }
}

export default Dialog;
