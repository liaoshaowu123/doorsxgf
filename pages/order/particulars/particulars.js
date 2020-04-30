// pages/order/particulars /particulars .js
import { Ljrqe } from '../../../utils/ljrqe.js';
var ljrqe = new Ljrqe();
var id=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mcOrder:'',
    mcOpOrders:[]
  },


  getMcOpOrder(id){
    let this_ = this;
    let data = { 
      orderId:id
    };
    ljrqe.post('mcoporder/get', data).then(res => {
      let mcOpOrders=res.data.mcOpOrders;
      let mcOrder=res.data.mcOrder;
      let list=this_.data.mcOpOrders;
      list.push(...mcOpOrders);
      this_.setData({
        mcOpOrders:list,
        mcOrder:mcOrder
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id){return};
    id = options.id;
    this.getMcOpOrder(id);
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