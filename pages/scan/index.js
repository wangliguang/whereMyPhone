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
        const [ prefix, uid ] = data.result.split('=');
        if (prefix != 'gg') {
          wx.showToast({
            title: '二维码格式错误',
            icon: 'none',
          })
          return;
        }

        const query = BMOB.Query('t_phone');
        query.equalTo("uid", '==', uid);
        query.find().then(result => {
          if (result.length != 0) {
            if (result[0].owner == this.data.nickName) {
              wx.showToast({
                title: '已拥有改设备，不可重复领取',
                icon: 'none',
              })
            } else {
              this.changeOwner(result[0].objectId);
            }
            return;
          }
          
          wx.navigateTo({
            url: `/pages/addDevice/index?uid=${uid}`,
          })
        });
      },
      fail: function (err) {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
        })
      }
    })
  },

  changeOwner: function (objectId) {
    const query = BMOB.Query('t_phone');
    query.set('id', objectId);
    query.set('owner', this.data.nickName)
    query.save().then(res => {
      wx.showToast({
        title: '领取成功',
        icon: 'none',
      })
      this.onShow();
    }).catch(err => {
      console.error(err)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    const isLogin = wx.getStorageSync('isLogin') || false;
    const userInfo = wx.getStorageSync('userInfo');
    if (!isLogin || !userInfo) {
      wx.stopPullDownRefresh();
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
      wx.stopPullDownRefresh();
      this.setData({
        dataArray: data,
      });
    }).catch((err) => {
      wx.showToast({
        title: err.message,
      })
    });
  },

  onEditDeviceInfo: function(e) {

    const { uid, platform, model, system, note, objectid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/addDevice/index?uid=${uid}&platform=${platform}&model=${model}&system=${system}&note=${note}&objectId=${objectid}`,
    })
  },

  onPullDownRefresh: function () {
    this.onShow();
  }

  
})