// index.ts
// 获取应用实例
// @ts-ignore
const regeneratorRuntime = require('../../utils/runtime.js')
import { getImgBase64, getNetWorkImgBase64 } from '../../utils/imgUtils';
import { findBusiness, scanAdd } from '../../api/index';
import { getParms } from '../../utils/util';
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),// 如需尝试获取用户信息可改为false
    array: ['华莱士车公庙店'],
    index: 0,
    showModal: false,
    showModal2: false,
    isHidden: true,
    picData: '',
    avatarPicData: '',
    phone: '',
    comName: '',
    comLocation: '',
    remark: '',
    userId: '',
    wechatName: '',
    userPhone: '',
    checked: false,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  radioChange(_e: any) {
    var checked = this.data.checked;
    this.setData({
      "checked": !checked
    })
  },
  onLoad(query: any) {
    if (query.scene) {
      const scene = decodeURIComponent(query.scene);
      var params = getParms(scene);
      wx.setStorageSync('appParams', params)
    }


    const appParams = wx.getStorageSync('appParams');
    console.log(appParams)
    var userInfo = wx.getStorageSync('userInfo');
    console.log('userInfo', userInfo);
    if (!Object.keys(appParams).length) {
      console.log("微信小程序码参数获取失败！")
      return;
    };
    this.getParmsById(appParams.id);

  },
  async getParmsById(id: string) {
    const data = await findBusiness({ id });
    console.log(data);
    const { extra } = data as any;
    this.setData({ array: [extra.petName], comName: extra.petName, userId: extra.id, comLocation: extra.comLocation, userPhone: extra.phone });

  },
  bindPickerChange: function (e: any) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTips() {
    this.setData({
      showModal: true
    })
  },
  toNavigator() {
    wx.navigateTo({
      url: '/pages/lottery/lottery?userPhone=' + this.data.userPhone,
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
        const picData: any = await getImgBase64(picFile);
        const userInfo = wx.getStorageSync('userInfo');
        if (!Object.keys(userInfo).length) return;
        const avatarPicBase64: any = await getNetWorkImgBase64(userInfo.avatarUrl);
        this.setData({ avatarPicData: avatarPicBase64, picData: picData });
      }
    })
  },
  getInput(e: any) {
    this.setData({ phone: e.detail.value })
  },
  async bindSubmit() {
    if (!this.data.checked) {
      wx.showToast({ title: "请勾选微信会员协议", icon: "none", duration: 1500 });
      return;
    }
    if (this.data.picData == "" || this.data.avatarPicData == "") {
      wx.showToast({ title: "请上传评价图片！", icon: "none", duration: 1500 });
      return;
    }
    const userInfo = wx.getStorageSync('userInfo');
    if (!Object.keys(userInfo).length) {
      console.log("微信信息获取失败！")
      return;
    };
    const appParams = wx.getStorageSync('appParams');
    if (!Object.keys(appParams).length) {
      console.log("微信小程序码参数获取失败！")
      return;
    };
    const { avatarPicData, picData, phone, remark, comLocation, comName, userId } = this.data;

    const params = {
      "comment": {
        "wechatName": userInfo.nickName,
        "phone": phone,
        "remark": remark,
        "comName": comName,
        "comLocation": comLocation ?? '',
        "usrId": userId ?? '1691743373192536066',
        "reOpenid": wx.getStorageSync('openid'),
      },
      "map": {
        "wechatAvatar": avatarPicData,
        "pictro": picData
      }
    };
    const data = await scanAdd(params)
    if (data == '添加成功') {
      wx.showToast({ title: "提交成功！", icon: "none", duration: 1500 });
    }
    console.log(data)
  },
  handleImgShow() {
    this.setData({ isHidden: false })
  },
  handleImgHide() {
    this.setData({ isHidden: true })
  },



})
