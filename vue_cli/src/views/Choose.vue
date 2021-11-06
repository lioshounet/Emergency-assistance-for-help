<template>
  <div>
    <el-container>
      <el-header></el-header>
      <el-main>
        <br />
        <br />
        <div>
          <p class="zhu">每一份帮助都值得被尊重</p>
          <p>
            <br />
            5·12汶川地震的面波震级为8.0级
            <br />
            5·12汶川地震的地震波确认共环绕了地球6圈
            <br />
            地震波及大半个中国以及亚洲多个国家和地区，中国国内北至内蒙古，东至上海，西至西藏
          </p>
        </div>
        <div class="card-box">
          <el-popover placement="left" width="400" trigger="hover">
            <div>123</div>
            <el-card :body-style="{ padding: '0px' }" slot="reference">
              <div @click="UPresources()">
                <img
                  src="img/the_main/dropbox.png"
                  class="image"
                  alt=""
                  v-animate-css.hover="'tada'"
                />
                <div style="padding: 14px">
                  <!-- <span>物质管理</span> -->
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button class="button">物质管理</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </el-popover>
          <el-popover placement="right" width="400" trigger="hover">
            <div style="display: inline-block">
              <img src="" alt="" />
              456
            </div>
            <el-card :body-style="{ padding: '0px' }" slot="reference">
              <div @click="forsave()">
                <img
                  src="img/the_main/qiujiurenyuan.png"
                  class="image"
                  alt=""
                  v-animate-css.hover="'flash'"
                />
                <div style="padding: 14px">
                  <!-- <span>求救/请求物质</span> -->
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button class="button">求救/请求物质</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </el-popover>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<style>
@import url("./../scss/Choose.css");
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