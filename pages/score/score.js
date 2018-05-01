// pages/score/score.js
var app =getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    termArray:[],
    index: 0,
    JD: 0.00,
    classArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    if (date.getMonth() < 7 && date.getMonth() > 0) {
      for(var i = 0; i < 4; i++) {
        this.data.termArray[i * 2] = (parseInt(date.getFullYear()) - i - 1) + "-" + (parseInt(date.getFullYear()) - i) + "-2";
        this.data.termArray[i * 2 + 1] = (parseInt(date.getFullYear()) - i - 1) + "-" + (parseInt(date.getFullYear()) - i) + "-1";
      }
    } else {
      this.data.termArray[0] = date.getFullYear() + "-" + (parseInt(date.getFullYear()) + 1) + "-1";
      for (var i = 1; i < 4; i++) {
        this.data.termArray[i * 2] = (parseInt(date.getFullYear()) - i) + "-" + (parseInt(date.getFullYear()) - i + 1) + "-1";
        this.data.termArray[i * 2 - 1] = (parseInt(date.getFullYear()) - i) + "-" + (parseInt(date.getFullYear()) - i + 1) + "-2";
      }
    }
    this.setData({
      termArray: this.data.termArray
    })
  },

  /**
   * 更改学期
   */
  pickerChangeTerm: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 分数查询
   */
  score: function () {
    var that = this;
    wx.request({
      url: "https://www.myangs.com/kedaquan/ScoreServlet?check=yangs&xh=" + app.globalData.studentId + "&pwd=" + app.globalData.password +"&term="+ this.data.termArray[this.data.index],
      data: {},
      header: { 'content-type': 'application/json' },
      method: "get",
      success: function (res) {
        if(res.data.msg == "成功") {
          for(var i = 0; i < res.data.成绩.length; i++) {
            that.data.classArray[i] = {
              kcm : res.data.成绩[i].课程名,
              khfs: res.data.成绩[i].考核方式,
              xf: res.data.成绩[i].学分,
              fs: res.data.成绩[i].分数
            }
            if(that.data.classArray[i].kcm.length > 18) {
              that.data.classArray[i].kcm = that.data.classArray[i].kcm.substring(0,18);
            }
          }
          that.setData({
            classArray : that.data.classArray,
            JD: res.data.绩点
            })
        } else {
          wx.showToast({
            title: '成绩查找失败',
            icon: "loading"
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络连接失败',
          icon: "loading"
        })
      }
    })
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
