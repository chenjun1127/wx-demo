import RequestInstance from './request'
export function scanAdd(params: any){
  return RequestInstance.post({
    url: '/scan/adds',
    data: params
  })
}

export function scanFind(params: any){
  return RequestInstance.get({
    url: '/scan/find',
    data: params
  })
}
export function findBusiness(params: any){
  return RequestInstance.get({
    url: '/scan/findBusiness',
    data: params
  })
}
export function WxOpenData(params: any){
  return RequestInstance.get({
    url: '/WxOpenData',
    data: params
  })
}
