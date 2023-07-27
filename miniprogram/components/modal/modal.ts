// components/modal/modal.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: true,
    },
    showFooter:{
      type:Boolean,
      value:false,
    }
  },
  options: {
    multipleSlots: true // 开启多个插槽支持
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    openModal() {
      this.triggerEvent('openModal', { value: true });
    },

    confirm() {
      // 确认按钮点击事件处理逻辑
      this.triggerEvent('confirm', { value: false });
    },

    cancel() {
      // 取消按钮点击事件处理逻辑
      this.triggerEvent('cancel', { value: false, });
    }
  }
})
