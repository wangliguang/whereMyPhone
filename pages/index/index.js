//index.js
//获取应用实例
const app = getApp()
import REQUEST from '../../utils/request.js';

Page({
  data: {
   dataArray: [],
   isLogin: true,
  },

  onLoad: function() {
    const userInfo = wx.getStorageSync('userInfo');
    app.globalData.userInfo = userInfo;
    this.setData({ isLogin: userInfo ? true : false });

    REQUEST('getPhoneList').then((data) => {
      this.setData({ dataArray: data });
    })
  },

  getUserInfo: function (e) {
    const { userInfo } = e.detail;
    app.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
    this.setData({ isLogin: true });
  }
})
