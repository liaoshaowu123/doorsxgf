// pages/order/particulars/subscribe/subscribe.js
import { Ljrqe } from '../../../../utils/ljrqe.js';
import { Config } from '../../../../utils/config.js'
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-01-01',
    start:'2018-09-01',
    img:'',
    imgUl:'',
    depositUrl:'',
    imgUrl:Config.imgUrl,
    orderId:'',
    position:'',
    contacts:'',
    contactsNumber:'',
    detail:{}
  },
  z:function(e){
    var that=this;
    console.log(e);
    console.log(e.detail.value);
    if (e.currentTarget.dataset.type == "location"){
      this.setData({
        location: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "name") {
      this.setData({
        name: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == "phone") {
      this.setData({
        phone: e.detail.value
      })
    }
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  upimg:function(e){
    var t =this;
    if(t.type==2){
      return
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: Config.resUrl+'mcplotcase/uploadImg',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            let imgUl = res.data;
            let img = t.data.imgUrl+res.data;
            t.setData({
              img:img,
              imgUl:imgUl
            })
          }     
        })
     }
    })
  },

  formSubmit: function (e) {  
    wx.showLoading({
      title: '上传中',
      mask: true
    })
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      let depositUrl = this.data.imgUl;
      let makmentTime = this.data.date;
      let orderId = this.data.orderId;
      let {position, contacts, contactsNumber} = e.detail.value;
      let data = {
        position:position,
        contacts:contacts,
        contactsNumber:contactsNumber,
        depositUrl:depositUrl,
        makmentTime:makmentTime,
        orderId:orderId,
        orderStatus:10
      }
      ljrqe.post('brandOrderV1/saveMOpOrder', data).then(res => {
        wx.navigateBack({
          delta: 2,
          })
      })   
}, 

getMakmentInfo(orderId){
  let this_ = this;
  let data = {
    orderId:orderId
  }
  ljrqe.post('brandOrderV1/getMakmentInfo', data).then(res => {
    let imgUrl = this_.data.imgUrl;
    imgUrl = imgUrl + res.data.depositUrl;
    this.setData({
      detail:res.data,
      img:imgUrl
    })
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let this_ = this;
    let start = options.start;
// 日期，在原有日期基础上，增加days天数，默认增加1天
  debugger
    var date = new Date(start);
    date.setDate(date.getDate());
    var month = date.getMonth() + 1;
    if (month.length < 2) {
      month = '0' + month;
    }
    var day = date.getDate() + 3;
    let end =  date.getFullYear() + '-' +month + '-' + day;
    if(options.type == 2){
      this_.getMakmentInfo(options.orderId)
    }

    this.setData({
      orderId:options.orderId,
      type:options.type||1,
      start:end,
      date:end
    })
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