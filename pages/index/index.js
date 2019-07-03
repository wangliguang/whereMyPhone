//index.js
//获取应用实例
const app = getApp()
import BMOB from '../../utils/bmob.js';


Page({
  data: {
   dataArray: [],
   isLogin: false,
   pwd: '',
  },

  onLoad: function() {
    const isLogin = wx.getStorageSync('isLogin') || false;
    this.setData({ isLogin });
  },

  onShow: function() {
    BMOB.Query('t_phone').find().then(res => {
      wx.stopPullDownRefresh();
      this.setData({
        dataArray: res,
      });
    });
  },

  getUserInfo: function (e) {
    const { userInfo } = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    

    if (this.data.pwd == '666666') {
      wx.setStorageSync('isLogin', true);
      this.setData({ isLogin: true });
      wx.showToast({ title: '登录成功' });
      return;
    } 
    wx.showToast({ title: '口令错误' });
  },

  onPwdChange: function(e) {
    const pwd = e.detail.detail.value;
    this.setData({
      pwd
    });
  },
  onPullDownRefresh: function() {
    this.onShow();
  }
})
