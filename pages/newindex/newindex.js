import { Config } from '../../utils/config.js';
import { Ljrqe } from '../../utils/ljrqe.js';

var ljrqe = new Ljrqe();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hbar: [{ id: "1", name:"首页"}],//[{ name: "定制产品", id: "1" }, { name: "直播频道", id: "2" }, { name: "招商", id: "3" }],
    hbarId: 1,
    bannerList: [],
    imgUrl: Config.imgUrl,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    uhide: 0,
    index: 0,

    typeList: [],
    tindex:1,// 当前页
    ttotal:2,// 总共有几页
    // 图片 1
    textimg:"/menchuang/upload/banner/202004/26/be846aca265a455f94acdc9c96d8fe50.jpg",
    // 铝材供应商
    supplierAI:[
      { id: 1, name: "爱氪佳" },
      { id: 2, name: "欧米德资" },
      { id: 3, name: "新河" },
      { id: 4, name: "华建" },
      { id: 5, name: "广亚同框" },
    ],
    // 配件供应商
    parts:[
      { id: 1, name: "深圳HOPO" },
      { id: 2, name: "派阁" },
      { id: 3, name: "瑞纳斯" },
      { id: 4, name: "科鲁克" },
    ],
    // 安装公司
    azList:[],
    // company:"湖南蜘蛛人建筑工程安装有限公司",
  },
  changeHId:function(e){
    this.setData({
      hbarId: e.currentTarget.dataset.id
    })
  },
  getList(){
    let t = this, d = t.data;
    this.getBannerList();
    // debugger
    // , {
    //   cityCode: "430100",
    // }
    ljrqe.post('appIndex/list').then(res => {
      console.log(res)
      console.log(res.data)
      let list = res.data;
      this.setData(res.data);
    })
  },
  getBannerList() {
    let data = {

    };
    /*
    azList 安装
    */
    // console.log(res)
    ljrqe.post('banner/list', data).then(res => {
      let list = res.data;
      this.setData({
        bannerList: list
      })
    })
  },
  changetIndex(e){
    let index = e.currentTarget.dataset.index;
    console.log("index:",index)
    this.setData({
      tindex: index+1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getList();
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