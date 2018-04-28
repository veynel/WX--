// pages/classInfo/classInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classInfoArray: []//课程
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //将获取的字符串转换为对象
    let object = JSON.parse(options.classArray);
    this.setData({ classInfoArray: object });
    console.log(this.data.classInfoArray)
  },

  /**
   * 改变显示课程
   */
  bindChangeZIndex: function (e) {
    for (var j = 0; j < this.data.classInfoArray.length; j++) {
      for (var i = 0; i < app.globalData.zIndexArray.length; i++) {
        if (app.globalData.zIndexArray[i] == this.data.classInfoArray[j].idx) {
          app.globalData.zIndexArray.splice(i,1);
        }
      }
      this.data.classInfoArray[j].select = 0;
    }
    app.globalData.zIndexArray.push(this.data.classInfoArray[e.currentTarget.dataset.index].idx)
    wx.setStorageSync("zIndexArray", app.globalData.zIndexArray)
    this.data.classInfoArray[e.currentTarget.dataset.index].select = 1;
    this.setData({
      classInfoArray: this.data.classInfoArray
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
