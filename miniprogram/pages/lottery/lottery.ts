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
    list1: [{
      "id": "1684546237275291649",
      "wechatName": "test",
      "wechatAvatar": "http://rxdxosey6.hn-bkt.clouddn.com/8a7965d1e0274b379c268fa04f554207.jpeg",
      "phone": "12345678999",
      "pictro": "http://rxdxosey6.hn-bkt.clouddn.com/087beacfc2764966b4126cf753e259c2.jpeg",
      "comState": "P",
      "comMoney": 1.37,
      "remark": "备注",
      "recTime": "2023-07-27 20:48:15",
      "disTime": "2023-07-27 20:48:15",
      "claimState": "NS",
      "comName": "商户名称",
      "comLocation": "商户位置",
      "usrId": "1",
      "usrName": null,
      "reOpenid": null
    },
    {
      "id": "1684546237275291649",
      "wechatName": "test",
      "wechatAvatar": "http://rxdxosey6.hn-bkt.clouddn.com/8a7965d1e0274b379c268fa04f554207.jpeg",
      "phone": "12345678999",
      "pictro": "http://rxdxosey6.hn-bkt.clouddn.com/087beacfc2764966b4126cf753e259c2.jpeg",
      "comState": "P",
      "comMoney": 1.37,
      "remark": "备注",
      "recTime": "2023-07-27 20:48:15",
      "disTime": "2023-07-27 20:48:15",
      "claimState": "NS",
      "comName": "商户名称",
      "comLocation": "商户位置",
      "usrId": "1",
      "usrName": null,
      "reOpenid": null
    },],
    list2: [],
    list3: [],
    wechatText: '',     
  },
  onLoad() {
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
  tel(event: any) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone,
      success: function (_res: any) {
        console.log('拨打电话成功！');
      },
      fail: function (_res: any) {
        console.log('拨打电话失败！');
      }
    })
  }
})
