// 微信小程序相对路径图片转base64
export function getImgBase64(filePath: string) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success: (res) => {
        let urlData = 'data:image/jpeg;base64,' + res.data
        resolve(urlData)
      },
      fail: (e) => {
        reject(e);
      }
    })
  })
}
// 网络图片转base64
export function getNetWorkImgBase64(filePath: string) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({     // 需要先下载 
      url: filePath,
      success(res) {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式：base64 | hex(16进制)
          success: res => { //成功的回调
            let urlData = 'data:image/jpg;base64,' + res.data;
            resolve(urlData)
          },
          fail: (e) => {
            reject(e);
          }
        })
      }
    })
  })
}