// logs.ts
// const util = require('../../utils/util.js')


Page({
  data: {
    logs: [],
    wxOpenId: false,
  },
  onLoad(options: any) {
    const wx_openid = options.myOpenId;
    var userInfo = wx.getStorageSync('userInfo');
    console.log("options" + JSON.stringify(options));
    console.log("logs wx_openid"+wx_openid)

    if (wx_openid) {
 
      wx.setStorageSync("wxOpenId", wx_openid);
      if (Object.keys(userInfo).length > 0) {
        wx.reLaunch({
          url: '/pages/index/index'
        })
      } else {
        console.log("----222")
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }

    }
  },
})
