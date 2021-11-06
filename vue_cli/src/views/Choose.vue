<template>
  <div>
    choose(准备施工)
    <br />
    <br />
    <div @click="UPresources()">物质管理</div>
    <br />
    <div @click="AskResources()" v-show="0"></div>
    <br />
    <div @click="forsave()">求救/请求物质</div>
  </div>
</template>


<style>
/* @import url("./../scss/map.css"); */
</style>

<script>
const axios = require("axios");
export default {
  // name: "EmergencyAssistanceForHelpAbout",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    UPresources() {
      this.$router.push({ name: "Login" });
    },
    forsave() {
      this.$router.push({ name: "SaveMe" });
    },
    AskResources() {
      this.$router.push({ name: "AskResources" });
    },
  },
};
</script>