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
    },
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.studentId = wx.getStorageSync('studentId');
    try{
      if (app.globalData.studentId) {
        var isShow = app.globalData.isShow;
        app.globalData.isShow = wx.getStorageSync('isShow');
        if (!app.globalData.isShow) {
          app.globalData.isShow = isShow;
        }
        var term = app.globalData.term;
        app.globalData.term = wx.getStorageSync('term');
        if (!app.globalData.term) {
          app.globalData.term = term; 
        }
        app.globalData.password = wx.getStorageSync('password');
        app.globalData.name = wx.getStorageSync('name');
        app.globalData.classInfo_c = wx.getStorageSync('classInfo');
        app.globalData.zIndexArray = wx.getStorageSync('zIndexArray');
        if (!app.globalData.zIndexArray) {
          app.globalData.zIndexArray = [];
        }
        wx.switchTab({
          url: '../schadule/schadule',
        })
      } else {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
              show: true
            })
          }
        })
      }
    } catch (e) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo,
            show: true
          })
        }
      })
    };
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
   * 输入学号
   */
  bindIdInput: function(e) {
    this.data.student.Id = e.detail.value;
    this.setData({
      student: this.data.student
    })
  },

  /**
   * 输入密码
   */
  bindPasswordInput: function (e) {
    this.data.student.password = e.detail.value;
    this.setData({
      student: this.data.student
    })
  },

  /**
   * 登入
   */
  logIn: function () {
    var that = this;
    wx.request({
      url: "https://www.myangs.com/kedaquan/KebiaoServlet?check=yangs&xh=" + that.data.student.Id + "&pwd=" + that.data.student.password +"&term="+app.globalData.term,
      data: {},
      header: { 'content-type': 'application/json' },
      method: "get",
      success: function (res) {
        app.globalData.isShow = false;
        if(!res.data.课表) {
          wx.showToast({
            title: '学号或密码错误',
            icon: "loading"
          })
        } else {
          app.globalData.classInfo_c = res.data.课表;
          wx.setStorageSync("classInfo", app.globalData.classInfo_c);
          app.globalData.studentId = that.data.student.Id;
          wx.setStorageSync("studentId", app.globalData.studentId);
          app.globalData.password = that.data.student.password;
          wx.setStorageSync("password", app.globalData.password);
          app.globalData.name = res.data.姓名;
          wx.setStorageSync("name", app.globalData.name);
          wx.switchTab({
            url: '../schadule/schadule',
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络链接失败',
          icon: "loading"
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
