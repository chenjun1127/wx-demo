// index.ts
// 获取应用实例


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  onLoad() {
    console.log(wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'))
    // @ts-ignore
    if (wx.getUserProfile) {
      console.log(1111)
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  bindGetUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    if (e.detail.errMsg != 'getUserInfo:fail auth deny') {
      console.log(111)
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权', 
        success:(res:any)=>{
          if (res.confirm) {
            
          }
        }
      })
    }
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
