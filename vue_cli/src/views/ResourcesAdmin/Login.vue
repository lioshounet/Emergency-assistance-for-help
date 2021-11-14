<template>
  <div class="loginbox">
    <!-- 登录界面----------------------------- -->
    <div class="block">
      <el-carousel trigger="click" :interval="2000">
        <el-carousel-item v-for="item in arr" :key="item" :height="'800px'">
          <!-- <h3 class="small">{{ item }}</h3> -->
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <span>登录</span>
      </div>
      <br />
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.passwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-radio-group v-model="form.man_type">
            <el-radio label="管理员"></el-radio>
            <el-radio label="普通用户"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-button type="primary" @click="login()">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>


<style>
@import url("./../../scss/login.css");
</style>

<script>
const axios = require("axios");
export default {
  // name: "EmergencyAssistanceForHelpAbout",
  data() {
    return {
      arr: [
        "img/Carousel/Carousel_p2.png",
        "img/Carousel/Carousel_p1.png",
        "img/Carousel/Carousel_p3.png",
      ],
      form: {
        name: "",
        passwd: "",
        man_type: "普通用户",
      },
    };
  },

  mounted() {},
  methods: {
    login() {
      if (this.form.name != "" && this.form.passwd != "") {
        if (this.form.man_type == "普通用户")
          this.$router.push({ name: "Resources" }).then(
            this.$message({
              message: "登录成功",
              type: "success",
            })
          );
        else {
          this.$router.push({ name: "Admin" }).then(
            this.$message({
              message: "登录成功",
              type: "success",
            })
          );
        }
      } else {
        this.$message.error("密码或者账号为空");
      }
    },
  },
};
</script>