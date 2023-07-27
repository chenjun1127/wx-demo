const host = 'http://106.75.172.90:8088'
class RequestInstance {
  static request(options = {} as any) {
    const { url, header: optHeader, ...otherOpts } = options
    const header = Object.assign({
      'content-type': 'application/json', // 默认值
    }, optHeader)
    const tmpUrl = `${host}${url}`;
    return new Promise((resolve, reject) => {
      wx.request({
        header,
        ...otherOpts,
        url: tmpUrl,
        success(res: any) {
          let response = res
          console.log(response)
          // 这里进行code异常处理
          // const exceptionError = exception(response);
          // if (exceptionError) {
          //   reject(exceptionError);
          //   return;
          // }
          if (res.data.code!==1) {
            reject(res.data);
          } else {
            resolve(res.data.map);
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  }
  static get(options: any) {
    return this.request(options);
  }
  static post(options: any) {
    options.method = 'POST';
    return this.request(options);
  }
}
export default RequestInstance;
