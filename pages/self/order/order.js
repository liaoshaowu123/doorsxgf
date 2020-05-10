// pages/self/order/order.js
import { Ljrqe } from '../../../utils/ljrqe.js';
import { Config } from '../../../utils/config.js';
var ljrqe = new Ljrqe();
var pageNo = 1;
var pageSize = 10;
var isHava = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    fromType:0,
    list: [],
    imgUrl:Config.imgUrl,
    orderStatusArry:Config.orderStatusArry
  },
  setl:function (e){
    this.reStart()
    this.setData({
      type: e.currentTarget.dataset.type
    })
    if(this.data.fromType == 0)
      this.getOrderListTZ(e.currentTarget.dataset.type)
    if(this.data.fromType == 1)
      this.getOrderListTGY(e.currentTarget.dataset.type)
    if(this.data.fromType == 1)
      this.getOrderListMD(e.currentTarget.dataset.type)

  },

  getOrderListTGY(type){
    this.setData({
      list:[]
    })
    if (!isHava){return};
    isHava=false;
    let this_ = this;
    let data = { pageNo, pageSize,type };
    ljrqe.post('mcOrderV1/disbt/list', data).then(res => {
      //console.log(res)
      if (res.data.length >= pageSize && res.totalPage!=pageNo){
        pageNo+=1;
        isHava=true;
      }
      
      let lists = res.data;
      let arr=this_.data.orderStatusArry;
      lists.map(v=>{
        v.statuss = arr[parseInt(v.orderStatus)]
      })
      
      let list=this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
      })
    })
  },
  getOrderListTZ(type){
    this.setData({
      list:[]
    })
    if (!isHava){return};
    isHava=false;
    let this_ = this;
    let data = { pageNo, pageSize,type };
    ljrqe.post('mcOrderV1/storeTz/list', data).then(res => {
      //console.log(res)
      if (res.data.length >= pageSize && res.totalPage!=pageNo){
        pageNo+=1;
        isHava=true;
      }
      
      let lists = res.data.orderList;
      let arr=this_.data.orderStatusArry;
      lists.map(v=>{
        v.statuss = arr[parseInt(v.orderStatus)]
      })
      
      let list=this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
      })
    })
  },

  getOrderListMD(type){
    this.setData({
      list:[]
    })
    if (!isHava){return};
    isHava=false;
    let this_ = this;
    let data = { pageNo, pageSize,type };
    ljrqe.post('mcOrderV1/storeMd/list', data).then(res => {
      //console.log(res)
      if (res.data.length >= pageSize && res.totalPage!=pageNo){
        pageNo+=1;
        isHava=true;
      }
      
      let lists = res.data.orderList;
      let arr=this_.data.orderStatusArry;
      lists.map(v=>{
        v.statuss = arr[parseInt(v.orderStatus)]
      })
      
      let list=this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list
      })
    })
  },

  reStart() {
    pageNo = 1;
    pageSize = 10;
    isHava = true;
    this.setData({
      list: [],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reStart();
    let type = options.type;
    this.setData({
      fromType:type
    })
    if(type == 0) //团长
    this.getOrderListTZ(this.data.type);
    if(type == 1) //推广员
    this.getOrderListTGY(this.data.type);
    if(type == 2) //门店
    this.getOrderListMD(this.data.type);
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