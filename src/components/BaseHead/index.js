import React from 'react'
import styles from './index.less'

class BaseHead extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render () {
        return (
            <div className={styles.title}></div>
        )
    }
}

export default BaseHead