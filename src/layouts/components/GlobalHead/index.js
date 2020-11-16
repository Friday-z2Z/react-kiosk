import React from 'react'
import classNames from 'classnames';

import { Layout } from 'antd';
import { sysTitle } from '@/config/platform.config'

import styles from './index.less'

const { Header } = Layout;

class GlobalHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const { children } = this.props

        return (
            <Header className={classNames(styles.basicLayoutHead,'media-login-head')}>
                <span>{ sysTitle }</span>
                { children }
            </Header>
        );
    }
}

export default GlobalHead;