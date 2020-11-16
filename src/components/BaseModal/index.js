import React from 'react'
import { Modal } from 'antd'

class BaseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        centered:true
    }

    render() {
        return (
            <Modal
                maskClosable={false}
                footer={null}
                {...this.props}
                wrapClassName={"baseModal "+ this.props.wrapClassName}
            >
                { this.props.children }
            </Modal>
        );
    }
}

export default BaseModal;