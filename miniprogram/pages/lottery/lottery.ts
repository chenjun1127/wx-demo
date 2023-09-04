// logs.ts
// const util = require('../../utils/util.js')
// import { formatTime } from '../../utils/util'

import { scanFind } from '../../api/index';

Page({
  data: {
    tabList: [
      { name: '已通过', type: 0 },
      { name: '审核中', type: 1 },
      { name: '已拒绝', type: 2 }
    ],
    tabIndex: 0,
    list1: [],
    list2: [],
    list3: [],
    wechatText: '',
    userPhone: '',
  },
  onLoad(options: any) {
    console.log(222, options)
    this.setData({ userPhone: options.userPhone });
    this.getData();
  },
  handleSwitch(e: any) {
    this.setData({ tabIndex: e.detail.type })
  },
  async getData() {
    const data = await scanFind({
      "reOpenid": wx.getStorageSync('openid'),
    })
    const { extra } = data as any;
    this.setData({
      list1: extra.Y,
      list2: extra.P,
      list3: extra.N,
    })
  },
  copy(e: any) {
    let item = e.currentTarget.dataset.item;
    console.log("复制", e, item);
    wx.setClipboardData({
      data: item, success: (_res: any) => {
        wx.showToast({ title: "复制成功", icon: "none", duration: 1500 });
      }
    })
  },
  tel() {
    if (this.data.userPhone == '' || this.data.userPhone == 'undefined') {
      wx.showToast({ title: "该商户未提供手机号码！", icon: "none", duration: 1500 });
      return;
    }
    console.log(1111, this.data.userPhone)
    wx.makePhoneCall({
      phoneNumber: this.data.userPhone,
      success: function (_res: any) {
        console.log('拨打电话成功！');
      },
      fail: function (_res: any) {
        console.log('拨打电话失败！');
      }
    })
  }
})
