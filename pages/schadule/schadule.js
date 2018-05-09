// pages/schadule/schadule.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#FF6666", "#61BC69", "#12AEF3", "#9999FF", "#FF7F00", "#DB7093", "#6699FF", "#FF3333", "#33CCCC"],//课标颜色样式
    weekArrays: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周", "第8周", "第9周", "第10周", "第11周", "第12周", "第13周", "第14周", "第15周", "第16周", "第17周", "第18周", "第19周", "第20周"],
    week: 0,//显示第几周的课表
    thisWeek: 8,//当前周
    _userInfo: [],//学生信息
    classInfo_c: [],//课表信息
    classInfo_e: [
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 },
      { zc: "", js: "", xq: "", ls: "", jc: "", kcdm: "", kcm: "", color: "", zIndex: -1 }
    ],//课表信息转换英文
    schaduleArray: []//课表
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var beginDate = new Date(app.globalData.date.replace(/-/g, "/"));
    var nowDate = new Date();
    var week = Math.floor(((nowDate - beginDate) / 86400000 + 1) / 7);
    if(week < 0) {
      week = 0;
    }
    this.setData({
      thisWeek: week,
      week: week,
    })
  },

  /** 
   * 课表生成函数
   */
  changeSchadule: function () {
    var that = this;
    var colorNumber = 0;//课程颜色
    var weekArray = new Array();
    that.data.schaduleArray = [];


    /* 初始化课表 */
    for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {

      that.data.classInfo_e[m].kcm = that.data.classInfo_c[m].课程名;
      that.data.classInfo_e[m].zc = that.data.classInfo_c[m].周次;
      that.data.classInfo_e[m].js = "@" + that.data.classInfo_c[m].教室;
      that.data.classInfo_e[m].xq = that.data.classInfo_c[m].星期;
      that.data.classInfo_e[m].ls = that.data.classInfo_c[m].老师;
      that.data.classInfo_e[m].jc = that.data.classInfo_c[m].节次;
      that.data.classInfo_e[m].kcdm = that.data.classInfo_c[m].课程代码;
      that.data.classInfo_e[m].zIndex = 0;

      that.data.classInfo_e[m].color = that.data.colorArrays[colorNumber++];
      //相同的课显示相同的颜色
      for (var j = 0; j < m; j++) {
        if (that.data.classInfo_e[m].kcm == that.data.classInfo_e[j].kcm) {
          that.data.classInfo_e[m].color = that.data.classInfo_e[j].color;
          colorNumber--;
          break;
        }
      }
      console.log(that.data.classInfo_e[m].kcm + "  " + that.data.classInfo_e[m].color)

      //当出现同一时间的多个课程时，选择显示哪个
      for (var i = 0; i < app.globalData.zIndexArray.length; i++) {
        if (m == app.globalData.zIndexArray[i]) {
          that.data.classInfo_e[m].zIndex = 1;
        }
      }
    }
    

    /* 未开始的课的颜色 */
    for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {
      var str = (that.data.classInfo_c[m].周次 + "").replace("\(周\)", "").replace("\(周\)", "").replace("\(周\)", "");
      weekArray = str.split(",");
      var color = that.data.classInfo_e[m].color;
      that.data.classInfo_e[m].color = "grey";
      for (var i = 0; i < weekArray.length; i++) {
        var weekArr = weekArray[i].split("-");
        if (weekArr.length == 1) {
          if (parseInt(that.data.week) + 1 == weekArr[0]) {
            that.data.classInfo_e[m].color = color;
          }
        } else {
          if (parseInt(that.data.week) + 1 >= weekArr[0] && parseInt(that.data.week) + 1 <= weekArr[1]) {
            that.data.classInfo_e[m].color = color;
          }
        }
      }
    }


    /* 课程安排 */
    for (var n = 0; n < that.data.classInfo_c.length - 1; n++) {

      //以课程的节次和星期组成二维数组储存对应课表的位置
      var i = parseInt((that.data.classInfo_c[n].节次 - 1) + "" + (that.data.classInfo_c[n].星期 - 1));

      //课程结束后删除该课程
      var str = (that.data.classInfo_c[n].周次 + "").replace("\(周\)", "").replace("\(周\)", "").replace("\(周\)", "");
      weekArray = str.split(",");
      var weekArr = weekArray[weekArray.length - 1].split("-");
      if (parseInt(weekArr[weekArr.length - 1]) < parseInt(that.data.week) + 1) {
        if (!that.data.schaduleArray[i]) {
          that.data.schaduleArray[i] = that.data.classInfo_e.length - 1;
        }
      } else {

        //是否有同时间的课
        if (that.data.schaduleArray[i]) {

          //判断显示课程
          if (that.data.classInfo_e[n].zIndex > that.data.classInfo_e[that.data.schaduleArray[i]].zIndex || that.data.classInfo_e[that.data.schaduleArray[i]].color == "grey") {

            //添加课程
            that.data.schaduleArray[i] = n;
          }
        } else {

          //添加课程
          that.data.schaduleArray[i] = n;
        }
      }

      //使相连的两节同样的课程只显示一次
      if (i > 9 && that.data.schaduleArray[i - 10] && that.data.classInfo_e[that.data.schaduleArray[i - 10]].kcm == that.data.classInfo_e[that.data.schaduleArray[i]].kcm) {
        that.data.classInfo_e[n].kcm = "";
        that.data.classInfo_e[n].js = ""
      }
    }


    that.setData({
      classInfo_e: that.data.classInfo_e,
      schaduleArray: that.data.schaduleArray
    });
  },

  /** 
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if(app.globalData.isShow) {
      this.setData({
        classInfo_c: "",
        schaduleArray: []
      });
      wx.request({
        url: "https://www.myangs.com/kedaquan/KebiaoServlet?check=yangs&xh=" + app.globalData.studentId + "&pwd=" + app.globalData.password + "&term=" + app.globalData.term,
        data: {},
        header: { 'content-type': 'application/json' },
        method: "get",
        success: function (res) {
          app.globalData.isShow = false;
          app.globalData.classInfo_c = res.data.课表;

          that.setData({
            classInfo_c: app.globalData.classInfo_c
          });

          //生成课表
          that.changeSchadule();
        },
        fail: function (res) {
          wx.showToast({
            title: '网络链接失败',
            icon: "loading"
          })
        }
      })
    }else {

      that.setData({
        classInfo_c: app.globalData.classInfo_c
      });

      //生成课表
      that.changeSchadule();
    }
  },

  /** 
   * 查看不同周的课表
   */
  bindPickerChange: function (e) {
    this.setData({
      week: parseInt(e.detail.value)
    })
    this.changeSchadule();
  },

  /** 
   * 返回当前周
   */
  BackToThisWeek: function () {
    this.setData({
      week: this.data.thisWeek
    })
    this.changeSchadule();
  },

  /** 
   * 点击课程，查看课程信息
   */
  showClassInfo: function (e) {
    var that = this;
    var classArray = new Array();//传递需要的课程
    var a = 0;

    for (var n = 0; n < that.data.classInfo_c.length - 1; n++) {

      //以课程的节次和星期组成二维数组储存对应课表的位置
      var i = parseInt((that.data.classInfo_c[n].节次 - 1) + "" + (that.data.classInfo_c[n].星期 - 1));

      //将星期和节次都对应得课程存储
      if (i == e.currentTarget.dataset.index) {
        var same = false;
        classArray[a] = { idx: "", classInfo: [], select: 0 };
        classArray[a].idx = n;

        //判断是否已显示
        if (that.data.schaduleArray[i] == n) {
          classArray[a].select = 1;
        }

        //检查是否存储了相同名称的课程
        for(var b = 0; b < a; b++) {
          if (that.data.classInfo_e[n].kcdm == that.data.classInfo_e[classArray[b].idx].kcdm) {
            same = true;
            classArray[b].select = (classArray[b].select == 1 ? classArray[b].select : classArray[a].select)
          }
        }

        //如果没有存储则将其存入数组
        if(!same) {
          classArray[a].classInfo.push(that.data.classInfo_e[n]);
          for (var m = 0; m < that.data.classInfo_c.length - 1; m++) {
            if (m != n && that.data.classInfo_e[n].kcdm == that.data.classInfo_e[m].kcdm) {
              classArray[a].classInfo.push(that.data.classInfo_e[m]);
            }
          }
          a++;
        }
        }
    }

    //以字符串的形式传递课程对象
    if (classArray.length) {
      let str = JSON.stringify(classArray);
      wx.navigateTo({
        url: '../classInfo/classInfo?classArray=' + str,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
