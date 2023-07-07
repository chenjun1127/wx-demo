
// 获取应用实例

const app = getApp()
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

  },
  getUserProfile() {
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let userInfo = res.userInfo
        console.log(userInfo)
        // 写入缓存
        wx.setStorageSync('userInfo', userInfo)
        // 更新用户信息
        this.setData({
          userInfo: userInfo,
        })
        // 登录成功提示
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }, 1000);
          },
        })
      },
      fail: () => {
        wx.showToast({
          title: '授权失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
  },
  bindGetUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    if (e.detail.errMsg != 'getUserInfo:fail auth deny') {
      app.isLogin();
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: (res: any) => {
          if (res.confirm) {

          }
        }
      })
    }

  }
})
