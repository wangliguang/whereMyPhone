// pages/scan/index.js
import BMOB from '../../utils/bmob.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },

  onGetPhone: function() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (data) => {
        let deviceInfo = {};
        try {
          deviceInfo = JSON.parse(data.result);
        } catch(err) {
          wx.showToast({
            title: '二维码格式错误',
            icon: 'none',
          })
          return;
        }
        
        
        if (deviceInfo.from != 'gg') {
          wx.showToast({
            title: '二维码格式错误',
            icon: 'none',
          })
          return;
        }

        const query = BMOB.Query('t_phone');
        query.equalTo("model", '==', deviceInfo.model)
        query.find().then(result => {
          if (result.length != 0) {
            this.changeOwner(result[0].objectId);
           return;
         } 
          this.savePhone(deviceInfo);
        })
        
      },
      fail: function (err) {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
        })
      }
    })
  },

  changeOwner: function(objectId) {
    const query = BMOB.Query('t_phone');
    
    query.set('id', objectId);
    query.set('owner', this.data.nickName)
    query.save().then(res => {
      console.log(res);
      wx.showToast({
        title: '已领取该设备',
        icon: 'none',
      })
    }).catch(err => {
      console.error(err)
    })
  },

  savePhone: function(deviceInfo) {
    const query = BMOB.Query('t_phone');
    query.set('model', deviceInfo.model);
    query.set('system', deviceInfo.system);
    query.set('owner', this.data.nickName);    

    query.save().then(res => {
      wx.showToast({
        title: '该测试机添加成功',
        icon: 'none',
      })
      this.onShow();
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.code === 401 ? '已拥有该测试机' : err.error,
        icon: 'none',
      })
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    const isLogin = wx.getStorageSync('isLogin') || false;
    const userInfo = wx.getStorageSync('userInfo');
    if (!isLogin || !userInfo) {
      wx.showToast({
        title: '请到首页登录并允许获取用户信息',
        icon: 'none',
      })
      return;
    } 
    this.setData({ isLogin: true, nickName: userInfo.nickName });
    const query = BMOB.Query('t_phone');
    query.equalTo("owner", '==', userInfo.nickName || '');
    query.find().then(data => {
      this.setData({
        dataArray: data,
      });
    }).catch((err) => {
      wx.showToast({
        title: err.message,
      })
    });
  },

  
})