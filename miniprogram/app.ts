import { scanJoin, } from "./api/index";

// app.ts
App({
  globalData: {} as any,
  onLaunch(options: any) {
    console.log('Launch options:', options.query.scene);  // 获取小程序启动时携带的参数
    // var scene = decodeURIComponent(options.query.scene);

    this.isLogin();
  },
  isLogin() {

    var wxOpenId = wx.getStorageSync('wxOpenId');
    console.log('wxOpenId=',wxOpenId)
    if (!wxOpenId) {
      wx.reLaunch({
        url: '/pages/logs/logs'
      })
    }

    this.getUserInfo();
  },
  getUserInfo: function () {
    wx.getSetting({
      success: (res: any) => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: async res => {
              console.log(res.code)
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log("用户的code:" + res.code);
              const data: any = await scanJoin({ js_code: res.code });
              wx.setStorageSync('openid', data.openid)
            }
          })
        } else {
          console.log("授权失败")
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})