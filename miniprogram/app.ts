import { config } from "./config";

// app.ts
App({
  globalData: {} as any,
  onLaunch() {
    // // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
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
            success: res => {
              console.log(res.code)
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log("用户的code:" + res.code);
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.appId + '&secret=' + config.AppSecret + '&js_code=' + res.code + '&grant_type=authorization_code',
                success: (res: any) => {
                  console.log(res);
                  console.log("用户的openid:" + res.data.openid);

                  wx.setStorageSync('openid', res.data.openid)


                }
              })
            },
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