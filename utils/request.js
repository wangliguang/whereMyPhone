
const BASEURL = 'http://10.36.36.31:3000/';

const REQUEST = function(url, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASEURL}${url}`,
      data: params,
      success: function(result) {
        resolve(result.data);
      },
      fail: function(err) {
        reject(err);
      },
    })
  })
}

export default REQUEST;