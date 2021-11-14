<template>
  <div class="MyResources">
    <!-- 我的资源----管理使用界面 -->
    <el-tabs type="border-card">
      <el-tab-pane label="求救信息">
        <el-card class="box-card" v-for="(card, index) in Save_msg">
          <el-descriptions title="求救信息">
            <el-descriptions-item label="经度">
              <!-- kooriookami -->
              {{ card.lng }}
            </el-descriptions-item>
            <br />
            <el-descriptions-item label="维度">
              {{ card.lat }}
            </el-descriptions-item>
            <!-- <el-descriptions-item label="居住地">苏州市</el-descriptions-item> -->

            <el-descriptions-item label="类型" class="ty">
              <el-tag size="small" v-for="t in card.type">台风</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="备注">
              {{ card.more }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="物资索取">
        <el-card class="box-card" v-for="(card, index) in Resources_msg">
          <el-descriptions title="求救信息" column="2">
            <el-descriptions-item label="经度">
              <!-- kooriookami -->
              {{ card.lng }}
            </el-descriptions-item>
            <br />
            <el-descriptions-item label="维度">
              {{ card.lat }}
            </el-descriptions-item>
            <el-descriptions-item label="电话">
              {{ card.tel }}
            </el-descriptions-item>
            <!-- <el-descriptions-item label="居住地">苏州市</el-descriptions-item> -->
            <el-descriptions-item label="备注">
              {{ card.more }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<style>
@import url("./../../../../scss/UpResources/AdminS.css");
</style>

<script>
const axios = require("axios");
export default {
  name: "EmergencyAssistanceForHelpUserinfo",

  data() {
    return {
      Resources_msg: [],
      Save_msg: [],
    };
  },

  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/save_msg",
    }).then((response) => {
      this.Save_msg = response.data;
      // console.log(response.data);
      // console.log(this.Resources_msg);
    });
    axios({
      method: "GET",
      url: "http://localhost:3000/AskResources",
    }).then((response) => {
      this.Resources_msg = response.data;
      // console.log(response.data);
      // console.log(this.Resources_msg);
    });
  },

  methods: {},
};
</script>