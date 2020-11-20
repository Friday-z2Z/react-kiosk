// 布局地址
const BASIC_PATH = ['/login', '/readcardCX']

// 入口地址
const ENTRY_PATH = ['/readcardCX', '/sys/matters']

// 测试弹窗地址
const TEST_MODAL_PATH = ['/readcardCX', '/sys/matters']

// 测试人员信息
const USER_INFO = {
	NAME: '测试账号',
	IDCARD: '330702197412064123'
}

// 性别常量
const SEX_OPTION = [{ value: '1', label: '男' }, { value: '2', label: '女' }]

// 中断原因
const INTERRUPT_OPTION = [{ value: '6300', label: '人员中断缴费' }]

const TOKEN = '7a3377fdb9764b9e9205803738a387fc'

const CONSTANT_PARAMS = { functionId: 1, projid: 1 }

const CITIES = {
	// 金华
	JH:{
		CENTER:'330799', // 市本级
		KFQ:'330704',	// 开发区
	},
	// 湖州
	HZ:{
		CENTER:'330599', // 市本级
		WX:'330502',	// 吴兴
		NX:'330503',	// 南浔
	}
}


export {
	BASIC_PATH,
	ENTRY_PATH,
	TEST_MODAL_PATH,
	USER_INFO,
	SEX_OPTION,
	INTERRUPT_OPTION,
	TOKEN,
	CONSTANT_PARAMS,
	CITIES
}