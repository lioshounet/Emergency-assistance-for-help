<template>
  <div id="app">
    <!-- 管理资源界面的骨架 -->
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>隐藏/显示
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="MyResources()">
                物资审核
              </el-menu-item>
              <el-menu-item index="1-2" @click="Resourcesmap()">
                显示求救
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 20px">
          <span>{{ user1info.name }}</span>
        </el-header>
        <el-main>
          <AdminR v-show="showwhat.MyResources"></AdminR>
          <AdminSave v-show="showwhat.Resourcesmap"></AdminSave>

          <!-- <Resourcesmap v-show="showwhat.Resourcesmap"></Resourcesmap> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<style>
.el-container {
  height: 1000px;
  border: 1px solid #eee;
}

/* @import url("./../../../scss/Resourcesmap.css"); */
</style>

<script>
// import Myinfo from "./ShowWhat/Myinfo";
import AdminR from "./AdminShowWhat/AdminR";
import AdminSave from "./AdminShowWhat/AdminS";
// import Resourcesmap from "./ShowWhat/ResourcesUse";
const axios = require("axios");
export default {
  components: {
    // Myinfo,
    AdminR,
    AdminSave,
    // Resourcesmap,
  },
  name: "EmergencyAssistanceForHelpResourcesmap",

  data() {
    return {
      showwhat: {
        Myinfo: 0,
        MyResources: 0,
        Resourcesmap: 0,
      },
      user1info: {},
    };
  },

  mounted() {
    axios({
      method: "GET",
      url: "http://localhost:3000/user1info",
    }).then((response) => {
      this.user1info = response.data[0];
      console.log(response.data);
      // console.log("12356");
    });
  },

  methods: {
    MyResources() {
      this.showwhat.Myinfo = 0;
      this.showwhat.MyResources = 1;
      this.showwhat.Resourcesmap = 0;
    },
    Resourcesmap() {
      this.showwhat.Myinfo = 0;
      this.showwhat.MyResources = 0;
      this.showwhat.Resourcesmap = 1;
    },
  },
};
</script>
