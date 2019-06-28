// pages/scan/index.js
import REQUEST from '../../utils/request.js';
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
        REQUEST('getPhone', {
          id: data.result,
          owner: getApp().globalData.userInfo.nickName,
        }).then(() => {
          wx.showToast({
            title: '领取成功',
          })
        })
        
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    REQUEST('myPhone', {
      owner: getApp().globalData.userInfo.nickName,
    }).then((data) => {
      this.setData({
        dataArray: data,
      });
    })
  },

  
})