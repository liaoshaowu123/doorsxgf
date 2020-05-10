import { Config } from '../../utils/config.js';
import { Ljrqe } from '../../utils/ljrqe.js';

var ljrqe = new Ljrqe();
let livePlayer = requirePlugin('live-player-plugin');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liveList: [],
    statusArr: { 101: "直播中", 102: "未开始", 103: "已结束", 104: "禁播", 105: "暂停中", 106: "异常", 107: "已过期" },
    interval:0,
    timer:60000,
  },

  getList() {
    ljrqe.post('live/list', {}).then(res => {
      let list = res.room_info;
      // console.log("live", list)
      this.setData({
        liveList: list
      });
      this.getStatus();
    })
  },
  gotoRoom: function(e){
    let roomId = e.currentTarget.dataset.id; // 具体的房间号，
    let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 1 })) 
    // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数）
    console.log(roomId,customParams);
    wx.navigateTo({
      url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
    })
  },
  getStatus(){
    let t = this,d=t.data, liveList = d.liveList, timer = d.timer;
    setInterval(function () { 
      liveList.forEach((v, i) => {
        livePlayer.getLiveStatus({ room_id: v.roomid })
          .then(res => {
            liveList[i].live_status = res.liveStatus;
          })
          .catch(err => {
            console.log('get live status', err)
          }).then(res => {
            t.setData({ liveList : liveList })
          })
      })
    }, timer);
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