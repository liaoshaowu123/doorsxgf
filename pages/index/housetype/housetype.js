// pages/index/housetype/housetype.js
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
    list:[],
    imgUrl:Config.imgUrl
  },

  getList(plotId){
    if (!isHava){return};
    isHava=false;
    let this_ = this;
    let data = { pageNo, pageSize ,plotId};
    ljrqe.post('mcplotcase/list', data).then(res => {
      //console.log(res)
      if (res.data.length >= pageSize && res.totalPage!=pageNo){
        pageNo+=1;
        isHava=true;
      }
      let lists = res.data;
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
    this.reStart()
    this.getList(options.id)
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