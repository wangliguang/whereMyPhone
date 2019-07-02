// pages/my/index.js
const app = getApp();
import BMOB from '../../utils/bmob.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '333',
  },

  onNameChange: function(e) {
    this.setData({
      name: e.detail.detail.value,
    });
  },

  onSubmit: function() {
    const query = BMOB.Query('t_phone');
    query.set("model", this.data.name)
    query.set("owner", app.globalData.userInfo.nickName)
    query.save().then(res => {
      wx.showToast({
        title: '发布成功',
        icon: 'none',
      })
    }).catch(err => {
      wx.showToast({
        title: err.message,
        icon: 'none',
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})