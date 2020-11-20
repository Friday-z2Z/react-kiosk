import { request } from '@/utils';
/**
 * 个体停保
 */
// 前置校验
export function getGTLDZTBInfo(payload) {
    return request('/employment/person/personFlexibleShm/interruptValidate', {
        method: 'Get',
        params:{
            ...payload,
            insuranceCode: 110
        },
    });
}

export function submit(payload) {
    return request('/employment/person/personFlexibleShm/interruptSave', {
        method: 'Get',
        params:{
            ...payload
        },
    });
}