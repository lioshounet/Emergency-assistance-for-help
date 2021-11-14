<template>
  <div class="MyResources">
    <!-- 我的资源----管理使用界面 -->
    <el-card class="box-card" v-for="(card, index) in Resources_msg">
      <div slot="header" class="clearfix">
        <span>{{ card.name }}</span>
      </div>
      <img :src="card.img" alt="" />
      <div>
        <div class="more">
          <p>共计{{ card.nmb }}个</p>
        </div>
        <div class="stepbox">
          <el-radio-group v-model="card.how">
            <el-radio-button label="1">审核</el-radio-button>
            <el-radio-button label="2">快递捡包</el-radio-button>
            <el-radio-button label="3">运输</el-radio-button>
            <el-radio-button label="4">到站检查</el-radio-button>
            <el-radio-button label="5">入库</el-radio-button>
          </el-radio-group>
        </div>
        <div
          :class="{ upappeal: index === clickIndex }"
          @click="upappeal(index)"
          id="upbu"
        >
          <el-button>确认提交</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style>
@import url("./../../../../scss/UpResources/AdminR.css");
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
    });
  },

  methods: {
    upappeal(index) {
      axios({
        method: "PUT",
        url: "http://localhost:3000/user1R/" + String(index + 1),
        data: {
          name: this.Resources_msg[index].name,
          nmb: this.Resources_msg[index].nmb,
          how: this.Resources_msg[index].how,
          po: this.Resources_msg[index].po,
          img: this.Resources_msg[index].img,
          more: this.Resources_msg[index].more,
        },
      });
      // console.log(index);
    },
    pp() {
      alert(this.Resources_msg[0].how);
    },
  },
};
</script>