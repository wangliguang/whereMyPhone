// pages/my/index.js
import BMOB from '../../utils/bmob.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    platform: '',
    model: '',
    system: '',
    note: '',
  },

  onLoad: function(options) {
    this.uid = options.uid;
    this.nickName = wx.getStorageSync('userInfo').nickName;
  },

  onPlatformChange: function(e) {
    this.setData({
      platform: e.detail.detail.value,
    });
  },
  onModelChange: function (e) {
    this.setData({
      model: e.detail.detail.value,
    });
  },
  onSystemChange: function (e) {
    this.setData({
      system: e.detail.detail.value,
    });
  },
  onNoteChange: function (e) {
    this.setData({
      note: e.detail.detail.value,
    });
  },

  onSubmit: function() {
    if (this.data.platform.length == 0 || this.data.model.length == 0 || this.data.system.length == 0) {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
      })
      return;
    }

    const query = BMOB.Query('t_phone');
    query.equalTo("uid", '==', this.uid);
    query.find().then(result => {
      console.log('result', result);
      if (result.length != 0) {
        this.changeOwner(result[0].objectId);
        return;
      }
      this.savePhone();
    });
  },

  savePhone: function () {
    const query = BMOB.Query('t_phone');
    query.set("platform", String(this.data.platform));
    query.set("model", String(this.data.model));
    query.set("system", String(this.data.system));
    query.set("note", String(this.data.note));
    query.set('uid', this.uid);
    query.set("owner", this.nickName)
    query.save().then(res => {
      wx.showToast({
        title: '该设备添加成功',
        icon: 'none',
        duration: 1000,
      });
      setTimeout(wx.navigateBack, 1000);
    }).catch(err => {
      console.error(err);
    })
  },
})