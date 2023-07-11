// components/dialog.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: false,
    }
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
      this.triggerEvent('openModal', true);
    },

    confirm() {
      // 确认按钮点击事件处理逻辑
      this.triggerEvent('confirm', false);
    },

    cancel() {
      // 取消按钮点击事件处理逻辑
      this.triggerEvent('cancel', false);
    }
  }
})
