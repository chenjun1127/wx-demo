
// 获取应用实例

const app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxOpenId: false,
  },
  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  onLoad(_options: any) {

  },
  bindLogin() {
    console.log("111",this.data);
    if (this.data.nickName != '' && this.data.avatarUrl != '' && !this.data.avatarUrl.startsWith('https://mmbiz.qpic')) {
      const userInfo = {
        avatarUrl: this.data.avatarUrl,
        nickName: this.data.nickName,
      }
      wx.setStorageSync('userInfo', userInfo)
      wx.navigateTo({
        url: '/pages/index/index'
      })
    } else {
      wx.showToast({ title: "请授权选择您的头像和昵称！", icon: "none", duration: 1500 });
    }
  },
  getInputValue(e: any) {
    this.setData({ nickName: e.detail.value })
  },
})
