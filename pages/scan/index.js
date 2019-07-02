// pages/scan/index.js
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
        const query = Bmob.Query('t_phone');
        query.set('id', data.result) 
        query.set('owner', getApp().globalData.userInfo.nickNam)
        query.save().then(res => {
          query.equalTo("owner", "==", getApp().globalData.userInfo.nickNam);
          return query.find()
        }).then(() => {
          
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
    REQUEST('myPhone', {
      owner: getApp().globalData.userInfo.nickName,
    }).then((data) => {
      this.setData({
        dataArray: data,
      });
    })
  },

  
})