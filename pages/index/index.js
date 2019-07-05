//index.js
//获取应用实例
const app = getApp()
import BMOB from '../../utils/bmob.js';


Page({
  data: {
   dataArray: [],
   isLogin: false,
   pwd: '',
   realName: '',
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
    if (this.data.pwd == '666666' && this.data.realName.length != 0) {

      const { userInfo } = e.detail;
      userInfo.realName = this.data.realName;
      wx.setStorageSync('userInfo', userInfo);

      wx.setStorageSync('isLogin', true);
      this.setData({ isLogin: true });
      wx.showToast({ title: '登录成功' });
      return;
    } 
    wx.showToast({ title: '口令错误或未输入姓名' });
  },

  onRealNameChange: function(e) {
    const realName = e.detail.detail.value;
    this.setData({
      realName
    });
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
