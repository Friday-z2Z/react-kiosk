import React from 'react'
import ReactDOM from 'react-dom'
import { CITIES } from '@/config/constant.config.js'

class _CommonSave extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	afterSave = (dispatch,params) => {
		console.log(this)
		// this.setState({
		// 	dispatch,
		// 	params
		// },()=>{
		// 	this.addMatter()
		// })
	}

	// 新增办件
	addMatter = () => {
		const { 
			situation,
			logId,
			materials,
			sbmc,
			contacterMobilephone,
			certNumber,
			name,
			regionCode,
			powerMatterCode,
			dispatch
		} = this.state
		const { JH, HZ } = CITIES

		if (logId === '' || logId === undefined || logId === null){
			React.$tipModal.tickModal({
				content:'未获取到logId,请联系管理员',
				duration:5,
				countdown:true,
				pathname:'/sys/matters',
				query:{},
				state:{}
			})
			return
		}

		if (regionCode === HZ['NX'] || regionCode === HZ['WX'] ) {
			regionCode = HZ['CENTER']
		} else if(regionCode === JH['KFQ']) {
			regionCode = JH['CENTER']
		}
		dispatch({
			type:'global/addDothing',
			paylload:{
				name,
				certNumber,
				regionCode,
				sbmc,
				logId,
				powerMattersCode:powerMatterCode,
				telephone:contacterMobilephone,
				blqx:situation,
				device_mac:React.$tools.getMachineCode()
			}
		})

	}

	render() {
		return '';
	}
}

let div = document.createElement('div')
div.className = 'common-save'
document.body.appendChild(div)
let CommonSave = ReactDOM.render(React.createElement(
    _CommonSave
), div)

export default CommonSave;