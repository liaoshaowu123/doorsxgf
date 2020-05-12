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
    type: 1,
    list: [],
    storeName:'',
    imgUrl:Config.imgUrl,
    orderStatusArry:Config.orderStatusArry
  },
  setl: function (e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.onLoad()
  },


  getOrderList(type){
    if (!isHava){return};
    isHava=false;
    let this_ = this;
    let data = { pageNo, pageSize ,type};
    ljrqe.post('mcOrderV1/store/list', data).then(res => {
      //console.log(res)
      if (res.totalPage!=pageNo){
        pageNo+=1;
        isHava=true;
      }
      let storeName = res.data.storeName;
      let lists = res.data.orderList;
      let arr=this_.data.orderStatusArry;
      lists.map(v=>{
        console.log(v.orderStatus)
        v.statuss = arr[parseInt(v.orderStatus)]
      })
      
      let list=this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list,
        storeName:storeName
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
    this.getOrderList(this.data.type);
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
    var this_=this;

    let data = { pageNo, pageSize, type: this.data.type };
    ljrqe.post('mcOrderV1/store/list', data).then(res => {
      //console.log(res)
      // res.data.length >= pageSize &&
      if ( res.totalPage != pageNo) {
        pageNo ++;
        isHava = true;
      }
      let storeName = res.data.storeName;
      let lists = res.data.orderList;
      let arr = this_.data.orderStatusArry;
      lists.map(v => {
        console.log(v.orderStatus)
        v.statuss = arr[parseInt(v.orderStatus)]
      })

      let list = this_.data.list;
      list.push(...lists);
      this_.setData({
        list: list,
        storeName: storeName
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})