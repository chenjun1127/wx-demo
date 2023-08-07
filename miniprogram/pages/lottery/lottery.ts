// logs.ts
// const util = require('../../utils/util.js')
// import { formatTime } from '../../utils/util'

import { scanFind } from "../../api";

Page({
  data: {
    tabList: [
      { name: '审核中', type: 0 },
      { name: '已通过', type: 1 },
      { name: '已拒绝', type: 2 }
    ],
    tabIndex: 0,
  },
  onLoad() {
    this.getData();
  },
  handleSwitch(e: any) {
    this.setData({ tabIndex: e.detail.type })
  },
  getData(){
    // const data =   scanFind({
    //   "comment": {
    //     "wechatName": userInfo.nickName,
    //     "phone": phone,
    //     "remark": remark,
    //     "comName": comName,
    //     "comLocation": comLocation,
    //     "usrId": userId
    //   },
    //   "map": {
    //     "wechatAvatar": avatarPicData,
    //     "pictro": picData
    //   }
    // })
  }
})
