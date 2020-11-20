let rightnowleft = -510

function bgiManage() {
  // img change
  let test = gid("test")
  let bgimg = gid("back")
  let bgilist = newBlank.bgilist;
  let bgiNodeClickList = []

  function backchange(url = "") {
    bgimg.style.backgroundImage = "url(" + url + ")"
  }
  let checked = document.createElement("div")

  let bgiNum = 0;

  function changeBgi(uuidSelf) {
    let num = 0;
    for (let bgi of bgilist) {
      if (uuidSelf == bgi.uuid) {
        break;
      } else {
        num++;
      }
    }
    bgiNum = num;
  }

  changeBgi(newBlank.checkUUID);

  function spawnbgi(url) {
    let imgNode = gclass("single")[0].cloneNode(true);
    imgNode.firstElementChild.onclick = function () {
      imgNode.style.display = 'none';
      dataCheck(bgilist, url.uuid, bgilist.length - 1);
      updata();
      event.stopPropagation();
    }
    imgNode.children[1].src = url.url
    imgNode.onclick = () => {
      if (newBlank.checkUUID !== url.uuid) {
        backchange(url.url);
        imgNode.lastElementChild.innerText = '●';
        checked.innerText = '';
        checked = imgNode.lastElementChild;
        newBlank.checkUUID = url.uuid;
        updata();
      }
      changeBgi(url.uuid)
    }
    if (newBlank.checkUUID == url.uuid) {
      backchange(url.url);
      imgNode.lastElementChild.innerText = '●'
      checked = imgNode.lastElementChild;
    }
    bgiNodeClickList.push({
      click: function nodeClick() {
        if (newBlank.checkUUID !== url.uuid) {
          backchange(url.url);
          imgNode.lastElementChild.innerText = '●';
          checked.innerText = '';
          checked = imgNode.lastElementChild;
          newBlank.checkUUID = url.uuid;
          updata();
        }
        changeBgi(url.uuid)
      }
    })
    return imgNode
  }
  let bgiCon = gid("bgi-con")
  test.onclick = () => {
    rightnowleft = rightnowleft ? 0 : -510
    sidebar.style.left = rightnowleft + 'px'
    test.style.transform = "rotate(" + (rightnowleft ? 0 : 1) + "turn)"
  }

  for (let bgi of bgilist) {
    test.onclick = () => {
      rightnowleft = rightnowleft ? 0 : -510
      sidebar.style.left = rightnowleft + 'px'
      test.style.transform = "rotate(" + (rightnowleft ? 0 : 1) + "turn)"
    }
    bgiCon.appendChild(spawnbgi(bgi))
  }
  //-----------------------------------------------------
  // 背景-左-右
  let swiPart = gid("switch-part");
  let swiWhole = gid("posi-switch");
  if (newBlank.position == "1") {
    swiPart.style.left = "40%";
    bgimg.style.backgroundPosition = 'left'
  } else {
    swiPart.style.left = "0%";
    bgimg.style.backgroundPosition = 'right'
  }
  swiWhole.onclick = function () {
    if (newBlank.position == "0") {
      swiPart.style.left = "40%";
      bgimg.style.backgroundPosition = 'left'
      newBlank.position = "1"
    } else {
      swiPart.style.left = "0%";
      bgimg.style.backgroundPosition = 'right'
      newBlank.position = "0"
    }
    updata();
  }
  //----------------------------------------------------
  // add bgi
  let bgiplus = gid("addbgi");
  let addbgicon = gid("addbgicon");
  let imgpush = gid("imgpush");

  bgiplus.onclick = function () {
    addbgicon.style.bottom = (addbgicon.style.bottom !== '0px') ? 0 : "-105px";
  }
  imgpush.onclick = function () {
    bgilist.push({
      uuid: UUid(bgilist),
      url: addbgicon.firstElementChild.value
    })
    updata();
    bgiCon.appendChild(spawnbgi(bgilist[bgilist.length - 1]))
    addbgicon.firstElementChild.value = ""
    addbgicon.style.bottom = "-105px";
  }
  // -------左 右 换 背景-------
  let bgiLeft = gid("bgi-left-change");
  let bgiRight = gid("bgi-right-change");


  bgiLeft.onclick = () => {
    if (bgiNum - 1 < 0) {
      bgiNodeClickList[bgilist.length - 1].click()
    } else {
      bgiNodeClickList[bgiNum - 1].click()
    }
  }

  bgiRight.onclick = () => {
    if (bgiNum + 1 > bgilist.length - 1) {
      bgiNodeClickList[0].click()
    } else {
      bgiNodeClickList[bgiNum + 1].click()
    }
  }
}

// -----修改link细节

function editCon() {
  let editclX = gid("editclX")
  this.editCon = gid("edit-con")
  this.editConfirm = gid("edit-confirm")
  this.editInputs = gid("edit-inputs")

  editclX.onclick = () => {
    this.editCon.hidden = true
  }

  this.install = (obj, dataUpdata, entityUpdata) => {
    this.editInputs.children[0].children[0].value = obj.text
    this.editInputs.children[1].children[0].value = obj.link
    this.editInputs.children[2].children[0].value = obj.favicon
    this.editInputs.children[3].children[0].value = obj.size.substring(0, obj.size.lastIndexOf('%'))

    this.editConfirm.onclick = () => {
      obj.text = this.editInputs.children[0].children[0].value
      obj.link = this.editInputs.children[1].children[0].value
      obj.favicon = this.editInputs.children[2].children[0].value
      obj.size = this.editInputs.children[3].children[0].value + '%'
      dataUpdata(obj)
      entityUpdata()
      this.editCon.hidden = true
    }

    this.editCon.hidden = false
  }
}

let edit = new editCon();

// --------------------------------------------------------
// short 网址链接

function shortCut(data, showEle) {
  this.data = data
  this.entity = document.getElementsByClassName("short")[0].cloneNode(true);
  this.entity.firstElementChild.onclick = () => {
    showEle(this.entity)
    this.entity.children[2].hidden = false;
    event.stopPropagation();
  }
  this.entity.onmouseover = () => {
    this.entity.style.backgroundColor = 
    this.entity.lastElementChild.hidden = false
  }
  this.entity.onmouseout = () => {
    if (this.entity.children[2].hidden) {
      this.entity.style.backgroundColor = null
      this.entity.lastElementChild.hidden = true
    }
  }
  this.entity.children[2].lastElementChild.onclick = () => {
    this.entity.remove();
    //json
    this.data.text = ''
    updata()
    event.stopPropagation();
  }

  this.dataUpdata = (obj) => {
    this.data.link = obj.link
    this.data.size = obj.size
    this.data.text = obj.text
    this.data.favicon = obj.favicon
    updata();
  }

  this.load = () => {
    this.entity.onclick = () => {
      window.location.href = this.data.link
      event.stopPropagation();
    }
    this.entity.children[1].style.backgroundImage = 'url(' + this.data.favicon + ')';
    this.entity.children[1].style.backgroundSize = this.data.size
    this.entity.lastElementChild.innerText = this.data.text

    this.entity.children[2].firstElementChild.onclick = () => {
      edit.install(this.data, this.dataUpdata.bind(this), this.load.bind(this))
      event.stopPropagation()
    }
  }
  this.install = () => {
    this.load();
    return this.entity
  }
}


// <div class="short" onclick="">
//  ! <button class="hid-but" onclick=""></button>
//  ! <div class="inner-img"></div>
//   <div class="options" hidden>
//   <div class="edit">编辑</div>
//   <div class="delete">删除</div>
// </div>  
//   <div class="describe" hidden ></div>
// </div>

function superLink(nets) {
  this.superEntity = document.createElement('div')
  this.superEntity.id = 'super-link'
  this.addEntity = document.createElement('div')
  this.addEntity.id = "addlink"
  this.addEntity.onclick = () => {
    addConQ.install(this.superEntity, nets, 0, this.setShowEle.bind(this))
  }
  this.showEle = null
  this.setShowEle = (ele) => {
    if (this.showEle != null) {
      this.showEle.children[2].hidden = true;
      this.showEle.style.backgroundColor = null
      this.showEle.lastElementChild.hidden = true
    }
    this.showEle = ele
  }
  let removeArr = []
  for (let i = 0; i <= nets.length - 1; i++) {
    if (nets[i].text != '') {
      this.superEntity.appendChild(new shortCut(nets[i], this.setShowEle.bind(this)).install())
    } else {
      removeArr.unshift(i);
    }
  }
  removeArr.map((i) => {
    nets.splice(i, 1)
  })
  gclass('container')[0].appendChild(this.addEntity)
  gclass('container')[0].appendChild(this.superEntity)
}

let superlinks = new superLink(newBlank.nets)

// --------------------------------------------------------
function addConF() {
  this.addCon = gid("addcon");
  this.target = null;

  this.addCon.children[1].onclick = () => {
    this.addCon.hidden = true
    event.stopPropagation();
  }

  this.loadJson = (json) => {
    if (this.target.which == 2) {
      let ar = []
      ar.push(json)
      // ar.push(json)
      this.target.json.push(ar)
    } else {
      this.target.json.push(json)
    }
  }

  this.loadEntity = (json) => {
    if (this.target.which == 1) {
      this.target.entity.insertBefore(new foldLink(json).init(), this.target.before)
    } else if (this.target.which == 2) {
      this.target.entity.insertBefore(new foldEntity(this.target.entity, this.target.json[this.target.json.length - 1]).install(), this.target.before)
    } else {
      this.target.entity.appendChild(new shortCut(json, this.before).install())
    }
  }

  this.addCon.lastElementChild.onclick = () => {
    if (this.addCon.children[2].children[0].children[0] != '' && this.addCon.children[2].children[1].children[0] != '') {
      let myjson = {
        text: this.addCon.children[2].children[0].children[0].value,
        favicon: (this.addCon.children[2].children[2].children[0].value ? this.addCon.children[2].children[2].children[0].value : './assets/web/icon/link.png'),
        size: (this.addCon.children[2].children[3].children[0].value ? this.addCon.children[2].children[3].children[0].value : 100) + '%',
        link: this.addCon.children[2].children[1].children[0].value
      }
      this.loadJson(myjson)
      updata();
      this.loadEntity(myjson)
      this.addCon.hidden = true
    } else {
      alert("名称和网址不能为空")
      console.error("名称和网址不能为空")
    }
  }

  this.install = (entity, json, which, before) => {

    this.target = {
      entity: entity,
      json: json,
      which: which,
      before: before
    }

    this.addCon.children[2].children[0].children[0].value = "";
    this.addCon.children[2].children[1].children[0].value = "";
    this.addCon.children[2].children[2].children[0].value = "";
    this.addCon.children[2].children[3].children[0].value = "";
    this.addCon.hidden = false
  }
}

let addConQ = new addConF()

function foldLink(info) {
  this.entity = document.createElement("div")
  this.entity.className = 'fold-link'
  this.entity.innerHTML = '<div class="fold-link-icon"></div><div class="fold-link-span"><div class="fold-link-edit" hidden>も</div><div class="fold-link-delete" hidden>×</div></div><div class="fold-link-describe" hidden></div>'
  this.data = info;
  this.dataUpdata = (obj) => {
    this.data.text = obj.text
    this.data.favicon = obj.favicon
    this.data.size = obj.size
    this.data.link = obj.link
    updata();
  }

  this.entity.children[1].lastElementChild.onclick = () => {
    this.entity.remove();
    this.data.text = ''
    updata();
  }

  this.entity.onmouseover = () => {
    this.entity.children[1].children[0].hidden = false
    this.entity.children[1].children[1].hidden = false
    this.entity.lastElementChild.hidden = false
    this.entity.style.height = '80px'
  }
  this.entity.onmouseout = () => {
    this.entity.children[1].children[0].hidden = true
    this.entity.children[1].children[1].hidden = true
    this.entity.lastElementChild.hidden = true
    this.entity.style.height = '60px'
  }
  this.load = () => {
    this.entity.firstElementChild.onclick = () => {
      window.location.href = this.data.link
      event.stopPropagation();
    }
    this.entity.firstElementChild.style.backgroundImage = 'url(' + this.data.favicon + ')'
    this.entity.firstElementChild.style.backgroundSize = this.data.size
    this.entity.lastElementChild.innerText = this.data.text

    this.entity.children[1].firstElementChild.onclick = () => {
      edit.install(this.data, this.dataUpdata.bind(this), this.load.bind(this))
      event.stopPropagation();
    }
  }
  this.init = () => {
    this.load();

    return this.entity;
  }
}


function foldEntity(parentEle, objs) {
  this.foldEntity = document.createElement("div")
  this.foldEntity.className = 'fold-container'
  this.foldEntity.innerHTML = "<div class='home'></div><div class='fold'></div>"
  this.foldEntity.style.left = '102px'
  this.foldEntity.onclick = () => {
    if (this.foldEntity.children[1].childElementCount == 1) {
      this.icon.remove();
      this.foldEntity.style.left = '102px'
      setTimeout(() => {
        parentEle.style.left = '0px'
      }, 201);
      event.stopPropagation();
    }
  }
  this.foldEntity.firstElementChild.onclick = () => {
    this.foldEntity.style.left = '102px'
    setTimeout(() => {
      parentEle.style.left = '0px'
    }, 201);
    event.stopPropagation();
  }
  this.innerlinks = objs
  let addLink = document.createElement("div")
  addLink.className = 'fold-add'
  addLink.onclick = () => {
    addConQ.install(this.foldEntity.children[1], this.innerlinks, 1, addLink);
  }
  let rvAr = []
  for (let i = 0; i <= this.innerlinks.length - 1; i++) {
    if (this.innerlinks[i].text == '') {
      rvAr.unshift(i)
    } else {
      this.foldEntity.children[1].appendChild((new foldLink(this.innerlinks[i])).init())
    }
  }
  rvAr.map((i) => {
    this.innerlinks.splice(i, 1)
  })

  this.foldEntity.children[1].appendChild(addLink);

  this.icon = document.createElement("div")
  this.icon.className = 'to-fold'
  this.icon.innerHTML = '<div class="to-fold-icon"></div>'
  this.icon.firstElementChild.style.backgroundImage = 'url(' + this.innerlinks[0].favicon + ')'
  this.icon.firstElementChild.style.backgroundSize = this.innerlinks[0].size

  this.icon.onclick = () => {
    parentEle.style.left = '102px'
    setTimeout(() => {
      this.foldEntity.style.left = '0'
    }, 302);
    event.stopPropagation();
  }
  document.getElementsByClassName("fold-placer")[0].appendChild(this.foldEntity)

  this.install = () => {
    return this.icon
  }
}


function homeFold(folds) {
  this.foldsEntity = document.createElement("div")
  this.foldsEntity.className = 'fold-container'
  let rvAr = []
  for (let i = 0; i <= folds.length - 1; i++) {
    if (!folds[i][0].text) {
      rvAr.unshift(i)
    } else {
      this.foldsEntity.appendChild(new foldEntity(this.foldsEntity, folds[i]).install())
    }
  }
  rvAr.map((i) => {
    folds.splice(i, 1)
  })
  let addLink = document.createElement("div")
  addLink.className = 'fold-add'
  addLink.onclick = () => {
    addConQ.install(this.foldsEntity, folds, 2, addLink)
  }
  this.foldsEntity.appendChild(addLink);
  document.getElementsByClassName("fold-placer")[0].appendChild(this.foldsEntity)
}

let searchBox = new searchTextBox("netput")
bgiManage();
let sideFold = new homeFold(newBlank.folds)

// 函数声明顺序组织
document.getElementsByClassName("canvas")[0].onclick = (e) => {
  firework(e.clientX, e.clientY);
  if (rightnowleft == 0) {
    rightnowleft = -510
    sidebar.style.left = '-510px'
    test.style.transform = "rotate(0turn)"
  }
  if (!runed && particleArr.length) {
    animate();
    runed = true;
  }
  setTimeout(() => {
    particleArr.splice(0, 50);
    circles.splice(0, 1);
    //cx.clearRect(0, 0, canvas.width, canvas.height);
  }, 600);
}

// --
window.onclick = function () {
  superlinks.setShowEle(null)
}

// auto request

function Fetch(url, data = {}) {
  let headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Origin: http": "login.ccnu.edu.cn",
    "Referer: http": "login.ccnu.edu.cn"
  }
  let request = {};

  request = {
    method: "POST",
    body: new FormData(data),
    headers
  }
  return fetch(url, request)
}

fetch('http://securelogin.arubanetworks.com/auth/index.html/u', {
  user: "2019213798 @cmcc",
  password: "LIUAN236519847"
})