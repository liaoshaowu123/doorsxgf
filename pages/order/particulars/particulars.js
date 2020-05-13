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
    date: '2020-09-01',
    mcOpOrders:[
      
    ]
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  getMcOpOrder(id){
    let this_ = this;
    let data = { 
      orderId:id
    };
    ljrqe.post('mcoporder/getList', data).then(res => {
      let mcOpOrders=res.data.mcOpOrders;
      let mcOrder=res.data.mcOrder;
      let list=this_.data.mcOpOrders;
      list.push(...mcOpOrders);
      var x = [
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "2020-04-23 15:30:29", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "团长已接单" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "2020-04-23 15:30:29", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "未复尺" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "已量房" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "窗户生产中" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "玻璃生产中" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "玻璃生产已完成"},
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "配件配货已完成"},
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "窗户生产已完成" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "业主预约已完成" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "安装已接单" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "已接货" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "安装已完成" },
        { "id": "", "isNewRecord": false, "remarks": "", "createDate": "", "updateDate": "", "orderId": "e6b70b5f20c749379c3238a3d460086b", "orderStatus": "验收完成" },

      ]
      
      for(var i in list){
        x[i]=list[i];
      }
      this_.setData({
        mcOpOrders:x,
        indexds:list.length-1,
        mcOrder:mcOrder,
        date: list[list.length-1].createDate,
        min: list[list.length - 1].createDate,
        lv: res.data.userLevel
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