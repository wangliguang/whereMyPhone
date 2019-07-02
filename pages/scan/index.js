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
      onlyFromCamera: true,
      success: function (data) {
        const query = BMOB.Query('t_phone');
        query.set('id', data.result) 
        query.set('owner', getApp().globalData.userInfo.nickNam)
        query.save().then(res => {
          this.onShow();
        }).catch(err => {
          wx.showToast({
            title: '',
            icon: 'none',
          })
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