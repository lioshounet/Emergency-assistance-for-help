<template>
  <div class="MyResources">
    <!-- 我的资源----管理使用界面 -->
    <el-card class="box-card" v-for="i in Resources_msg">
      <div slot="header" class="clearfix">
        <span>{{ i.name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          在地图中显示
        </el-button>
      </div>
      <img :src="i.img" alt="" />
      <div>
        <div class="more">
          <p>共计{{ i.nmb }}个</p>
        </div>
        <div class="stepbox">
          <p>流程</p>
          <el-steps
            :active="i.how"
            finish-status="success"
            direction="vertical"
          >
            <el-step title="审核"></el-step>
            <el-step title="快递捡包"></el-step>
            <el-step title="运输"></el-step>
            <el-step title="到站检查"></el-step>
            <el-step title="入库"></el-step>
          </el-steps>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style>
@import url("./../../../../scss/UpResources/MyResources.css");
</style>

<script>
const axios = require("axios");
export default {
  name: "EmergencyAssistanceForHelpUserinfo",

  data() {
    return {
      Resources_msg: [],
    };
  },

  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/user1R",
    }).then((response) => {
      this.Resources_msg = response.data;
      // console.log(response.data);
      // console.log(this.Resources_msg);
    });
  },

  methods: {},
};
</script>