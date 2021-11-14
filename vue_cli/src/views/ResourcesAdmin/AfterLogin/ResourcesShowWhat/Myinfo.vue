<template>
  <div class="Myinfo">
    <!-- 管理物资-------------------------个人信息界面 -->
    <img :src="form.headimg" alt="" />
    <el-form ref="form" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="人员类型">
        <el-radio-group v-model="form.mantype">
          <el-radio label="管理员"></el-radio>
          <el-radio label="用户"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.more"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="SingleReload()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style>
@import url("./../../../../scss/UpResources/Myinfo.css");
</style>

<script>
const axios = require("axios");
export default {
  name: "EmergencyAssistanceForHelpUserinfo",

  data() {
    return {
      form: {},
    };
  },

  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/user1info",
    }).then((response) => {
      this.form = response.data[0];
      // console.log(response.data);
    });
  },

  methods: {
    onSubmit() {
      axios({
        method: "PUT",
        url: "http://localhost:3000/user1info/1",
        data: {
          name: this.form.name,
          email: this.form.email,
          tel: this.form.tel,
          mantype: this.form.mantype,
          more: this.form.more,
          headimg: "img/userhead.jpg",
        },
      }).then((response) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    SingleReload() {
      location.reload();
    },
  },
};
</script>