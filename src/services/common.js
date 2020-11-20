import { request } from '@/utils';

// 获取人员信息
export function getUserInfo(payload) {
    return request('/common/common/personinfoShm/queryPersonBasicInfoWithInsured', {
        method: 'Get',
        params:{
            certNumber: payload.idCard,
            name: payload.name
        },
    });
}

// 获取统筹区信息
export function getTCQinfo(payload) {
    return request('/common/common/areainfoShm/getRegionInfo', {
        method: 'Get',
        params:{
            businessType:payload.businessType,
            certNumber: payload.idCard,
            name: payload.name
        },
    });
}

// 校验是否在业务期内(除查询、打印业务)
export function checkIsPeriod(payload) {
    return request('/common/common/checkIsBusinessPeriod/isBusinessPeriod', {
        method: 'Get',
        params:{...payload},
    });
}

// 获取权力事项编码
export function getSXidInfo(payload) {
    return request('/common/common/situationandmaterialsShm/situation', {
        method: 'Get',
        params:{...payload},
    });
}

// 获取情形材料
export function getSituationMaterials(payload) {
    return request('/common/common/situationandmaterialsShm/situation/materials', {
        method: 'Get',
        params:{
            qltsxbm:payload.powerMatterCode,
            xzqh:payload.regionCode
        },
    });
}

// 事项保存后续 addDothing
export function addDothing(payload) {
    return request('/common/common/adddothingShm/addDothing', {
        method: 'Get',
        params:{
            qltsxbm:payload.powerMatterCode,
            xzqh:payload.regionCode
        },
    });
}