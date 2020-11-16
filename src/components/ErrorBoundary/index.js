import React from 'react'
import router from 'umi/router'
import { Button } from 'antd'
import styles from './index.less'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError:false
        }
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            hasError:true
        })
    }

    handleClick = () => {
        router.push({
            pathname:'/login'
        })
    }

    render() {
        if (this.setState.hasError){
            return (
                <div className={styles.errorBoundary}>
                    <h1>不好意思，系统出现了故障</h1>
                    <Button onClick={this.handleClick}>返回首页</Button>
                </div>
            )
        }
        
        return (
            <>{ this.props.children }</>
        )

    }
}

export default ErrorBoundary;