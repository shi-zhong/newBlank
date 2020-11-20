<script>
    function dataCheck (arrlist=[],uuid,index,obj) {
      for (let i=0;i<index+1;i++) {
        if (arrlist[i].uuid==uuid) {
          if (obj) {
            arrlist.splice(i,1,obj)
          } else {
            arrlist.splice(i,1);
          }
          return true
        }
      }
      return false
    }
  // UUID spawner
  function UUid (arr=[{uuid:""}]) {
  function sp () {
    let uuid = ""
    for (let i = 0;i<=4;i++) {
      let ran = Math.floor(Math.random()*62)
      if (ran>=0&&ran<=9) {
        uuid+=ran
      } else if (ran>=10&&ran<=35) {
        uuid+=String.fromCharCode(ran+55)
      } else {
        uuid+=String.fromCharCode(ran+61)
      }
    }
    return uuid
  }
  let uuid = sp();
  for(let i=0;i<arr.length;i++){
    if (uuid == arr[i].uuid) {
      uuid = sp();
      i=-1;
    }
  }
  return uuid
  }

  export default {
    dataCheck,
    UUid
  }
</script>