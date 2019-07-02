//index.js
//获取应用实例
const app = getApp()
import BMOB from '../../utils/bmob.js';


Page({
  data: {
   dataArray: [],
   isLogin: true,
  },

  onLoad: function() {
    const userInfo = wx.getStorageSync('userInfo');
    app.globalData.userInfo = userInfo;
    this.setData({ isLogin: userInfo ? true : false });
  },

  onShow: function() {
    BMOB.Query('t_phone').find().then(res => {
      this.setData({
        dataArray: res,
      });
    });
  },

  getUserInfo: function (e) {
    const { userInfo } = e.detail;
    app.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
    this.setData({ isLogin: true });
  }
})
