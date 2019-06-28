//index.js
//获取应用实例
const app = getApp()
import REQUEST from '../../utils/request.js';

Page({
  data: {
   dataArray: [],
  },

  onLoad: function() {

    const isLogin = wx.getStorageSync('isLogin');
    
    if (!isLogin) {
      console.log(isLogin);
      wx.switchTab({
        url: '/pages/my/index',
      });
    }

    REQUEST('getPhoneList').then((data) => {
      this.setData({ dataArray: data });
    })
  }

})
