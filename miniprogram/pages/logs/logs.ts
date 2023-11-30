// logs.ts
// const util = require('../../utils/util.js')


Page({
  data: {
    logs: [],
    wxOpenId: false,
  },
  onLoad(options: any) {
    const wx_openid = options.myOpenId;

    console.log("options" + JSON.stringify(options));


    if (wx_openid) {

      wx.setStorageSync("wxOpenId", wx_openid);
      wx.navigateTo({
        url: '/pages/index/index'
      })
    } else {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
})
