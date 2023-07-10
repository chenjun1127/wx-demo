// index.ts
// 获取应用实例


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),// 如需尝试获取用户信息可改为false
    array: ['美国', '中国', '巴西', '日本'],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  onLoad() {
    var userInfo = wx.getStorageSync('userInfo');
    console.log(Object.keys(userInfo).length > 0);
    if (Object.keys(userInfo).length > 0) {
      console.log('用户已经授权过')
    } else {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  bindPickerChange: function (e: any) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})
