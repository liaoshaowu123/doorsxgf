// pages/order/particulars/up/up.js
import { Ljrqe } from '../../../../utils/ljrqe.js';
import { Config } from '../../../../utils/config.js'
var ljrqe = new Ljrqe();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:[],
    imgUrl:Config.imgUrl,
    img:'',
    imgUl:'',
    orderId:'',
    id:'',
    orderStatus:''
  },
  upimg: function (){
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        var img=that.data.image;
        img.push(...tempFiles)
        that.setData({
          image:img
        })
      },
    })
  },

  uploadImage(images){
    let t = this;
    wx.uploadFile({
      url: Config.resUrl+'mcplotcase/uploadImg',
      filePath: images.path,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        let imgUl = t.data.imgUl;
        let img = t.data.imgUrl+res.data; 
        imgUl = imgUl + res.data + ',';
        t.setData({
          img:img,
          imgUl:imgUl
        })
      }     
    })
  },

  submitDate(){
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    let this_ = this;
    var p = new Promise(function (resolve, reject) {
    for(let i=0;i<this_.data.image.length; i++){
      this_.uploadImage(this_.data.image[i])
      resolve(i)
    }
    
  })

  return p.then(val => {
    return new Promise(resolve => {
      setTimeout(() => {
        this_.upMcOp()
      }, 2000)
    })
})
  },

  upMcOp(){
    let this_ = this;
    let orderId = this.data.orderId;
    let id = this.data.id;
    let orderStatus = this.data.orderStatus;
    let imgUl = this.data.imgUl;
    orderStatus = orderStatus;
    let data = {
      orderId:orderId,
      orderStatus:orderStatus,
      id:id,
      imgUrl:imgUl
    }
    ljrqe.post('mcoporder/add', data).then(res => {
      if(res.code == 0){
       // this_.addMcOp()

       wx.navigateBack({
        delta: 1,
        })
      }
    })   
  },

  addMcOp(){
    let orderId = this.data.orderId;
    let orderStatus = this.data.orderStatus;
    orderStatus = orderStatus;
    let data = {
      orderId:orderId,
      orderStatus:orderStatus,
    }
    ljrqe.post('mcoporder/add', data).then(res => {
      if(res.code == 0){
        wx.navigateBack({
          delta: 1,
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      orderStatus:options.orderStatus,
      id:options.id,

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