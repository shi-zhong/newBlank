<template>
  <div class="container">
    <SearchBox></SearchBox>
    <div id="super-link">
      <SingleLink
        v-for="link in links"
        :key="link.link"
        :select="select"
        :setSelect="setSelect"
        :single="{ 
          describe: link.t,
          size: link.s,
          href: link.l,
          favicon: link.f
        }"
      />
    </div>
  </div>
</template>

<script>
import SearchBox from "./components/SearchBox";
import SingleLink from "./components/SingleLink";
import Storage from "../../methods/storge.js";

export default {
  name: "Search",
  data: function () {
    return {
      links: Storage.get("nets"),
      select: ""
    };
  },
  methods: {
    setSelect: function (select) {
      this.select = select;
    }
  },
  components: {
    SearchBox,
    SingleLink,
  },
};
</script>

<style>
.container {
  width: 500px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* border: 1px solid black; */
  pointer-events: none;
}
#super-link {
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
}
</style>