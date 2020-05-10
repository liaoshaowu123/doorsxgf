import { Config } from '../../utils/config.js';
import { Ljrqe } from '../../utils/ljrqe.js';

var ljrqe = new Ljrqe();
const updateManager = wx.getUpdateManager()

var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk = null;
var citycode = -1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hbar: [{ id: "1", name: "首页" }],//[{ name: "定制产品", id: "1" }, { name: "直播频道", id: "2" }, { name: "招商", id: "3" }],
    hbarId: 1, 
    bannerList: [],
    imgUrl: Config.imgUrl,
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    uhide: 0,
    index: 0,


    areaList: [],
    userId:"",
  },
  changeHId:function(e){
    this.setData({
      hbarId: e.currentTarget.dataset.id
    })
  },
  getList(){
    let t = this, d = t.data, citycode = d.citycode;
    console.log("getList-citycode:", citycode)
    ljrqe.post('appIndex/list',{
      cityCode: citycode
    }).then(res => {
      let list = res.data;
      this.setData(res.data);
    })
  },
  changetIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      tindex: index+1,
    })
  },
  /**
   * 地图定位
   */
  getlocat() {
    // 实例化API核心类
    if (!qqmapsdk) {
      qqmapsdk = new QQMapWX({
        //key: 'EYOBZ-4XV6O-X75WV-SNZSM-ROXD7-IAFQB'
        key: '3WIBZ-PQQED-IWC4W-PYCFJ-UQJE2-NBBEJ'
      });
    }

    let this_ = this;
    wx.showLoading({
      title: '读取位置中...',
      icon: 'none'
    })
    setTimeout(() => {
      qqmapsdk.reverseGeocoder({
        success: function (res) {
          wx.hideLoading();
          let data = res.result.ad_info;
          let city = wx.getStorageSync('city');
          let district = wx.getStorageSync('district');
          citycode = wx.getStorageSync('citycode');
          let code = data.city_code.replace(data.nation_code, '');
          this_.setData({
            city: city,
            district: district,
            citycode: code,
          })
          //storage!=result
          if (!!citycode && citycode != code) {
            this_.changeCity({
              city: data.city,
              district: data.district,
              oldcity: city,
              citycode: code
            });
          } else {
            this_.setData({
              city: data.city,
              district: data.district,
            })
            wx.setStorageSync('citycode', code);
            wx.setStorageSync('city', data.city);
            wx.setStorageSync('district', data.district);
            citycode = code;
          }
          this_.getList();
        }
      })
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // return
    console.log(options)
    console.log(options.scene)
    if (!!options.scene) {
      if (options.scene == wx.getStorageSync('userId')) {

      } else {
        let parentId = options.scene;
        this.setParent(options.scene);
      }

    }

    if (wx.getStorageSync('userType') == 1) {
      this.setData({
        isMaster: true,
      })
    }
    let this_ = this;
    this_.getlocat();
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
    // this.getList();
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