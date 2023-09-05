import { scanJoin, } from "./api/index";

// app.ts
App({
  globalData: {} as any,
  onLaunch(options: any) {
    console.log('Launch options:', options.query.scene);  // 获取小程序启动时携带的参数
    // var scene = decodeURIComponent(options.query.scene);
    // console.log(scene)
    // var params = getParms(scene);
    // wx.setStorageSync('appParams', params)
    this.isLogin();
  },
  isLogin() {
    var userInfo = wx.getStorageSync('userInfo');
    if (Object.keys(userInfo).length > 0) {
      console.log('用户已经授权过')
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
    this.getUserInfo();
  },
  getUserInfo: function () {
    wx.getSetting({
      success: (res: any) => {
        if (res.authSetting['scope.userInfo']) {
          // wx.getUserInfo({
          //   success: (res: any) => {
          //     this.globalData.userInfo = res.userInfo;
          //   },
          //   fail: () => {
          //     console.log("获取个人信息失败")
          //   }
          // })
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
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})