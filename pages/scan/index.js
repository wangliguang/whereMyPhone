// pages/scan/index.js
import BMOB from '../../utils/bmob.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onGetPhone: function() {
    wx.scanCode({
      onlyFromCamera: false,
      success: (data) => {
        this.savePhone(data.result);
      },
      fail: function (err) {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
        })
      }
    })
  },

  savePhone: function(udid) {

    

    const query = BMOB.Query('t_phone');
    query.set('udid', udid);
    query.set('owner', getApp().globalData.userInfo.nickName);

    const systemInfo = wx.getSystemInfoSync();
    query.set('model', systemInfo.model);
    query.set('system', systemInfo.system);
    

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
    const query = BMOB.Query('t_phone');
    query.set('owner', getApp().globalData.userInfo.nickName)
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