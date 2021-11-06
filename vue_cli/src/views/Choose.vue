<template>
  <div>
    <el-container>
      <!-- <el-header></el-header> -->
      <el-main>
        <el-carousel trigger="click" :interval="2000">
          <el-carousel-item
            v-for="item in imgarr"
            :key="item"
            :height="'800px'"
          >
            <!-- <h3 class="small">{{ item }}</h3> -->
            <img :src="item" alt="" height="920px" />
          </el-carousel-item>
        </el-carousel>
        <!-- 轮播图上面部分---------------- -->
        <br />
        <br />
        <div class="talk">
          <p class="zhu">每一份帮助都值得被尊重</p>
          <p>
            <br />
            5·12汶川地震的面波震级为8.0级
            <br />
            5·12汶川地震的地震波确认共环绕了地球6圈
            <br />
            地震波及大半个中国以及亚洲多个国家和地区，中国国内北至内蒙古，东至上海，西至西藏
            <br />
          </p>
        </div>
        <div class="card-box">
          <!-- 第一卡片组 -------------------------------------------------->
          <el-popover placement="left" width="400" trigger="hover">
            <div class="main_R">
              <img src="img/the_main/mian_R.png" alt="" width="400px" />
            </div>
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
          <!-- 第二卡片组 -------------------------------------------------->
          <el-popover placement="right" width="400" trigger="hover">
            <div class="mapbox">
              <img src="img/the_main/main_map.png" alt="" />
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
  components: {},
  data() {
    return {
      imgarr: [
        "img/Disaster assistance/Rescue1.jpg",
        "img/Disaster assistance/Rescue2.jpg",
        "img/Disaster assistance/Rescue3.jpg",
      ],
    };
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