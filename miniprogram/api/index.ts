import RequestInstance from './request'
export function scanAdd(params: any){
  return RequestInstance.post({
    url: '/scan/adds',
    data: params
  })
}
