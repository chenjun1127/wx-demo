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
    index: 0,
    showModal: false,
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
  bindTips() {
    console.log(111)
    this.setData({
      showModal: true
    })
  },
  toNavigator() {
    wx.navigateTo({
      url: '/pages/lottery/lottery'
    })
  },

  // imgClick:function(){
  //   var imgUrl = 'this.data.priceUrl';
  //   console.log('imgClick success',imgUrl)
  //   wx.previewImage({
  //     urls: imgUrl,//imgUrl 必须是需要预览的图片链接列表，只有一张图片也需要是列表
  //     success:(res=>{
  //       console.log('接口调用成功',res)
  //     })
  //   })
  // },

})
