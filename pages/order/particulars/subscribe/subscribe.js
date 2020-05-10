// pages/order/particulars/subscribe/subscribe.js
import { Ljrqe } from '../../../../utils/ljrqe.js';
import { Config } from '../../../../utils/config.js'
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    img:'',
    imgUl:'',
    depositUrl:'',
    imgUrl:Config.imgUrl,
    orderId:'',
    position:'',
    contacts:'',
    contactsNumber:'',
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
        orderStatus:11
      }
      ljrqe.post('brandOrderV1/saveMOpOrder', data).then(res => {
        this.setData({
          list:res.data  
        })
      })   
}, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
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