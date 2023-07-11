// logs.ts
// const util = require('../../utils/util.js')
// import { formatTime } from '../../utils/util'

Page({
  data: {
    tabList: [
      { name: '正在热映', type: 1 },
      { name: '即将上映', type: 0 }
    ]
  },
  onLoad() {

  },
  handleSwitch(e: any) {
    console.log(e) // { name: '即将上映', type: 0}
  },
})
