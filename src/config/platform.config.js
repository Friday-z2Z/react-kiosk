module.exports = {
    // 数据请求api
    apiPrefix: document.head.dataset.api || '',
    sysLogo: 'logo.png',
    // 登录页名称
    loginName: 'kiosk',
    // 系统名称
    sysName: 'kiosk',
    // 系统标题
    sysTitle: '欢迎使用浙江社保省集中系统自助服务终端',
    // 系统页脚
    sysFooterTitle: '欢迎使用浙江社保省集中系统自助服务终端 · 机器编号:',
    // 是否开启菜单权限校验 trur原始菜单与返回菜单比对形成权限菜单 false原始菜单
    menuPermission: false,
    pageNum: 1,
    // table默认一页条数
    pageSize: 10,
    sysFrom: '',
    // iconFont 地址
    iconUrl: '//at.alicdn.com/t/font_1030595_depmdbpf3yc.js',
    // 系统版本
    version: '20201026',
    // 系统默认首页
    sysDefultPage: {
        pathname: '/login',
        state: {
            key: 'login',
            pathtitles: [{ title: 'login' }],
        }
    },
};