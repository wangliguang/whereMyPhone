

// 将 dist 目录下，weapp.qrcode.esm.js 复制到项目目录中
import drawQrcode from '../../utils/weapp.qrcode.esm.js'

Page({
  data: {
    isShowTip: true,
  },

  onShow: function() {
    this.setData({
      isShowTip: true,
    });
  },
  
  onLoad: function () {
    
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      
      text: 'http://47.94.81.19:3000/stylesheets/index.html',
      image: {
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      }
    })
  },

  onCloseTips: function() {
    this.setData({
      isShowTip: false,
    });
  },
  
})
