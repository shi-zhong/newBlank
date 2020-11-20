<template>
  <div class="input">
    <input
      type="text"
      id="netput"
      maxlength="100"
      :placeholder="placeholder"
      autofocus="autofocus"
      tabindex="1"
      v-model="search_origin_URL"
      @keyup.enter="jumpToUrl"
      @focus="changeHoder(false)"
      @blur="changeHoder(true)"
    />
    <div class="tourl" @click="jumpToUrl">
      <img src="../../../assets/icon/toUrl.svg" alt="toUrl" id="tourl" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data: function () {
    return {
      search_origin_URL: "",
      placeholder: "百度搜索",
    };
  },
  methods: {
    jumpToUrl: function () {
      if (
        /https:\/\/\w/.test(this.search_origin_URL) ||
        /http:\/\/\w/.test(this.search_origin_URL)
      ) {
        window.location.href = encodeURI(this.search_origin_URL);
      } else {
        window.location.href = encodeURI(
          "https://www.baidu.com/baidu?wd=" +
            this.search_origin_URL +
            "&tn=ubuntuu_cb&ie=utf-8"
        );
      }
    },
    changeHoder: function (bool) {
      this.placeholder = bool ? "百度搜索" : "";
    },
  },
};
</script>

<style scoped>
.input {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(184, 184, 184);
  box-shadow: rgba(182, 182, 182, 0.5) 2px 2px 3px 0;
  pointer-events: all;
  background: white;
  opacity: 0.8;
  border-radius: 21px;
  overflow: hidden;
}
#netput {
  width: 450px;
  height: 40px;
  margin: 0;
  padding: 0 15px;
  font-size: 20px;
  line-height: 40px;
  outline: none;
  border: none;
}
.tourl {
  width: 50px;
  height: 40px;
  margin: 0;
  padding: 0;
  position: relative;
}
.tourl:hover {
  background-color: rgb(161, 161, 161, 0.3);
  border-radius: 21px;
}
#tourl {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>