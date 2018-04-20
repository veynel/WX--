// pages/boundStudent/boundStudent.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {
      name: "",
      id: "",
      password: ""
    }
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
    this.data.student.Id = app.globalData.studentId;
    this.data.student.password = app.globalData.password;
    this.data.student.name = app.globalData.name;
    this.setData({
      student: this.data.student
    })
    console.log(this.data.student)
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
  bindIdInput: function(e) {
    this.data.student.Id = e.detail.value;
    this.setData({
      student: this.data.student
    })
  },

  /**
   * 用户点击右上角分享
   */
  bindPasswordInput: function (e) {
    this.data.student.password = e.detail.value;
    this.setData({
      student: this.data.student
    })
  },

  /**
   * 用户点击右上角分享
   */
  logIn: function () {
    var that = this;
    wx.request({
      url: "https://www.myangs.com/kedaquan/KebiaoServlet?check=yangs&xh=" + that.data.student.Id + "&pwd=" + that.data.student.password +"&term="+app.globalData.term,
      data: {},
      header: { 'content-type': 'application/json' },
      method: "get",
      success: function (res) {
        if(!res.data.课表) {
          wx.showToast({
            title: '学号或密码错误',
            icon: "loading"
          })
        } else {
          app.globalData.classInfo_c = res.data.课表;
          app.globalData.studentId = that.data.student.Id;
          app.globalData.password = that.data.student.password;
          app.globalData.name = res.data.姓名;
          wx.switchTab({
            url: '../schadule/schadule',
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  logOut: function () {
    app.globalData.classInfo_c = "";
    app.globalData.studentId = "";
    app.globalData.password = "";
    app.globalData.name = "";
    wx.switchTab({
      url: '../personal/personal',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
