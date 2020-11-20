<template>
  <div :class="{ short: true, enter: option || enter }" @mouseenter="enter = true" @mouseleave="enter = false">
    <button class="hid-but" @click.stop="setSelect('23')"></button>
    <div class="options" v-if="option">
      <div class="edit">编辑</div>
      <div class="delete">删除</div>
    </div>
    <a :href="single.href">
      <!-- <div
        class="inner-img"
        :style="{
          backgroundImage: 'url(../../../assets/logo/' + single.favicon + '',
          backgroundSize: single.size,
        }"
      ></div> -->
      <img class="inner-img" src="../../../assets/logo/baidu.svg" alt="innerimg">
      <div class="describe" v-if="option || enter">{{ single.describe }}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "SingleLink",
  props: {
    single: Object,
    select: String,
  },
  data: function () {
    return {
      option: false,
      enter: false,
    };
  },
  computed: {
    
  }
};
</script>

<style>
.short {
  position: relative;
  height: 100px;
  width: 100px;
  margin: 10px 10px;
  border-radius: 5px;
  border-width: 1px;
  pointer-events: all;
}
.short:hover::before {
  content: "...";
  position: absolute;
  display: block;
  height: 15px;
  line-height: 0px;
  top: 5px;
  right: 0px;
  font-size: 25px;
  pointer-events: none;
  border-radius: 50%;
  /* border: 1px solid black; */
  transform: rotate(90deg);
}
.hid-but {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 15px;
  height: 20px;
  border: none;
  outline: none;
  background: none;
  z-index: 2;
}
.inner-img {
  border: 1px solid rgb(155, 155, 155);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 60%;
  background-image: none;
  background-color: rgba(255, 255, 255, 0.8);
}
.options {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  top: 5px;
  left: 90%;
  width: 66px;
  border-radius: 10px;
  overflow: hidden;
  z-index: 2;
}
.edit,
.delete {
  text-align: center;
  font-size: 17px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  margin: 4px;
}
.edit:hover,
.delete:hover {
  background-color: rgba(211, 211, 211, 0.803);
}

.describe {
  text-align: center;
  height: 20px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  color: black;
}
.enter {
  background-color: rgba(255,255,255,0.6);
}
</style>