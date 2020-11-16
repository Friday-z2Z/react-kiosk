import React from 'react'
import router from 'umi/router'
import styles from './index.less'

class CountDownModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.timer = null
    }

    static defaultProps = {
        countdown:false,
        duration:5
    }

    tick = () => {
        const { countdown, pathname, query, state } = this.props
        this.setState({
            duration: this.state.duration - 1
        },()=>{
            if (this.state.duration === 0) {
                const { onClose=null } = this.props
                clearInterval(this.timer)
                
                countdown && (
                    React.$tipModal.clear()
                )
                
                if (countdown && typeof onClose === 'function'){
                    React.$tipModal.clear()
                    onClose()
                }
                pathname && (
                    router.push({
                        pathname:pathname||'/login',
                        query:query||{},
                        state:state||{}
                    })
                )
            }
        });
    }

    componentDidMount(){
        const { duration } = this.props;
        if (duration){
            this.setState({
                duration
            });
            this.timer = setInterval(() => {
                this.tick()
            }, 1000)
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        const { duration } = this.state
        const { content, handleClose, dbCountdown, countdown } = this.props
        return (
            <>
                { 
                    dbCountdown && duration
                }
                { content }
                {
                    countdown && (
                        <span className={styles.countdown}>{ duration }</span>
                    )
                }
                
                <div className={styles.mark} onClick={handleClose}></div>
            </>
        );
    }
}

export default CountDownModal;
