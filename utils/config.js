var homeUrl = 'https://xgf.askjhb.com'  //'http://test.hnqinghuang.com'  'http://xingongfu.ksweishang.com'
class Config {
  constructor() {
  }
}
Config.resUrl = homeUrl + '/menchuang/app/';
Config.imgUrl = homeUrl;
Config.topicData={};
Config.orderStatusArry = ['未复尺','已量房','铝材生产中','玻璃生产中','配件备货中','玻璃生产已完成','铝合金框架生产已完成','业主预约安装','安装已接单','已接货','安装已完成','验收完成'];
export { Config };