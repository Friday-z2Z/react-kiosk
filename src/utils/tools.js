var state = {}

const getNowFormatTime = () => {
    let date = new Date();
    let seperator = '';
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    let currentdate = date.getFullYear() + seperator + month + seperator + strDate;
    
    return currentdate;
}

const noPassByName = (str) => {
    if (null !== str && str !== undefined) {
        if (str.length <= 3) {
            return '*' + str.substring(1, str.length);
        } else if (str.length > 3 && str.length <= 6) {
            return '**' + str.substring(2, str.length);
        } else if (str.length > 6) {
            return str.substring(0, 2) + '****' + str.substring(6, str.length)
        }
    } else {
        return '';
    }
}

const noPassByMobile = (str) => {
    if (null !== str && str !== undefined) {
        const pat = /(\d{3})\d*(\d{4})/;
        return str.replace(pat, '$1****$2');
    } else {
        return '';
    }
}

const noPassByBankNum = (str) => {
    if (null !== str && str !== undefined) {
        let split = '';
        for (let i = 0; i < str.length - 10; i++) {
            split += '*'
        }
        const pat = /^(\d{6})\d+(\d{4})$/;
        return str.replace(pat, '$1' + split + '$2');
    } else {
        return '';
    }
}

const noPassByIdCard = (idStr) => {
    let charArr = idStr.split('')
    let result = charArr.reduce((arr, next, index) => {
        ((index > 0 && index < 4) || (index > 11 && index < 17)) ? arr.push('*') : arr.push(next)
        return arr
    }, [])
    return result.join('')
}

const setUserInfo = (payload) => {
    state.userInfo = payload
}

const getUserInfo = () => {
    return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo')) || {}
}

const setMachineCode = (payload) => {
    state.machineCode = payload
}

const getMachineCode = () => {
    return state.machineCode || JSON.parse(window.localStorage.getItem('machineCode')) || {}
}

const translateError = (message) => {
    let _OriginallyPrompt = message // 原本提示信息
    let _FriendlyPrompt = message // 优化后提示提示
    let haveTimeout = message.search(/timeout/) !== -1
    let haveException = message.search(/Exception/) !== -1 && message.search(/BizRuleException/) === -1
    let havezhongwen = message.search(/[\u4e00-\u9fa5]+/g) !== -1
    let haveBiz = message.search(/BizRuleException/) !== -1
    let haveExDe = message.search(/TooManyResultsException/) !== -1 ||
        message.search(/MyBatisSystemException mybatis/) !== -1 || message.search(/SQL/) !== -1
    if (haveTimeout) {
        _OriginallyPrompt = message
        _FriendlyPrompt = '服务超时，请稍后重试'
        return;
    } else {
        if (haveException) {
            if (haveExDe) {
                _OriginallyPrompt = message
                _FriendlyPrompt = '数据库操作异常，请联系管理员'
            } else {
                _OriginallyPrompt = message
                _FriendlyPrompt = '系统异常，请联系管理员'
            }
        } else {
            if (haveBiz) {
                let newMessage = message.split('BizRuleException')[1]
                if (newMessage.search('地税') !== -1) {
                    _OriginallyPrompt = newMessage
                    _FriendlyPrompt = '地税服务通讯失败'
                } else if (newMessage.search('税务') !== -1) {
                    _OriginallyPrompt = newMessage
                    _FriendlyPrompt = '税务服务通讯失败'
                } else if (havezhongwen) {
                    const codeIndex = message.search(/[a-z,A-Z]/g)
                    const zwIndex = message.search(/[\u4e00-\u9fa5]+/g)
                    message = message.substring(message.search(/[\u4e00-\u9fa5]+/g), zwIndex < codeIndex ? codeIndex : message.length)
                    _OriginallyPrompt = message
                    _FriendlyPrompt = message
                }
            } else {
                if (havezhongwen) {
                    if (message.match(/[\u4e00-\u9fa5]+/g).join().search('地税') !== -1) {
                        _OriginallyPrompt = message
                        _FriendlyPrompt = '地税服务通讯失败'
                    } else if (message.match(/[\u4e00-\u9fa5]+/g).join().search('税务') !== -1) {
                        _OriginallyPrompt = message
                        _FriendlyPrompt = '税务服务通讯失败'
                    } else {
                        _OriginallyPrompt = message
                        _FriendlyPrompt = message
                    }
                } else {
                    _OriginallyPrompt = message
                    _FriendlyPrompt = message
                }
            }
        }
    }
    return {
        _OriginallyPrompt: _OriginallyPrompt,
        _FriendlyPrompt: _FriendlyPrompt
    }
}

export default {
    getNowFormatTime,
    noPassByName,
    noPassByMobile,
    noPassByBankNum,
    noPassByIdCard,
    translateError,
    setUserInfo,
    getUserInfo,
    setMachineCode,
    getMachineCode
}