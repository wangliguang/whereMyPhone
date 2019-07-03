

// 将 dist 目录下，weapp.qrcode.esm.js 复制到项目目录中
import drawQrcode from '../../utils/weapp.qrcode.esm.js'

Page({
  data: {
    
  },
  
  onLoad: function () {
    
    const { model, system } = wx.getSystemInfoSync();

    const systemInfo = {
      from: 'gg',
      model,
      system,
    }

    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      
      text: JSON.stringify(systemInfo),
      image: {
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      }
    })
  },
  
})
