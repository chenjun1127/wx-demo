// index.ts
// 获取应用实例
// @ts-ignore
const regeneratorRuntime = require('../../utils/runtime.js')
import { getImgBase64, getNetWorkImgBase64 } from '../../utils/imgUtils';
import { scanAdd } from '../../api/index';
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
    showModal2: false,
    isHidden: true
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
  bindConfirm() {
    this.setData({
      showModal: false
    })
  },
  bindCancel() {
    this.setData({
      showModal: false
    })
  },
  bindTips2() {
    this.setData({
      showModal2: true
    })
  },
  bindConfirm2() {
    this.setData({
      showModal2: false
    })
  },
  bindCancel2() {
    this.setData({
      showModal2: false
    })
  },
  bindUploadImg() {
    // 1.选择一张本地的照片
    wx.chooseMedia({       //定义选择图片的返回值
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      camera: 'back',
      success: async (res: any) => {
        let picFile = res.tempFiles[0].tempFilePath
        const picData = await getImgBase64(picFile);
        const userInfo = wx.getStorageSync('userInfo');
        console.log(userInfo);
        if (!userInfo) return;
        const avatarPicBase64 = await getNetWorkImgBase64(userInfo.avatarUrl);
        console.log(avatarPicBase64);
        const data = await scanAdd({
          "comment": {
            "wechatName": userInfo.nickName,
            "phone": "12345678999",
            "remark": "备注",
            "comName": "商户名称",
            "comLocation": "商户位置",
            "usrId": "1"
          },
          "map": {
            "wechatAvatar": avatarPicBase64,
            "pictro": picData
          }
        })
        console.log(data)
      }
    })
  },
  handleImgShow() {
    this.setData({ isHidden: false })
  },
  handleImgHide() {
    this.setData({ isHidden: true })
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
