const storage = function () {
  let name = "newBlank";
  let update = function () {
    window.localStorage.setItem(name, JSON.stringify(this.json));
  };
  this.json = JSON.parse(window.localStorage.getItem(name)) || {bgilist:[],checkUUID:"",fold:[],nets:[{t:"百度",s:"100%",l:"https://www.baidu.com",f:"baidu.svg"}],position:""};
  this.get = function (name) {
    return JSON.parse(JSON.stringify(this.json[name]));
  };
  this.set = function (name, json) {
    this.json[name] = JSON.parse(JSON.stringify(json));
    update();
  };
}

export default new storage();

/*

  统一链接图片地址
  /src/assets/logo
  统一背景图片地址
  /src/assets/bgi
  统一icon图片地址
  /src/assets/icon


  interface bgi {
    uuid:string,
    url:string
  }

  interface net {
    text:string,
    favicon:string,
    size:string,
    link:string
  }

 uuid === url
  bgilist: bgi[],
  checkUUID: "",
  folds: [net[]]
  nets: net[],
  position
*/