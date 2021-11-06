<template>
  <div class="hello">
    <!-- 求救界面---------- -->
    <baidu-map
      class="map"
      center="重庆合川区"
      @rightclick="clickBmap"
      :double-click-zoom="false"
      :scroll-wheel-zoom="true"
    >
      <!--地图视图-->

      <bm-view class="map"></bm-view>
      <!--搜索-->

      <!-- 定位按钮 -->
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      >
      </bm-geolocation>
      <!-- 比例尺 -->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!-- 缩放控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 城市 -->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>

      <!-- 手动标记 -->
      <bm-marker
        :position="my_position"
        v-show="bm_show"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="我的位置"
          :labelStyle="{ color: 'red', fontSize: '24px' }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker>

      <bm-local-search
        :keyword="keyword"
        :panel="false"
        :auto-viewport="true"
        :location="location"
        @searchcomplete="searchcomplete($event)"
        @resultshtmlset="showsame($event)"
      ></bm-local-search>
    </baidu-map>

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="求救表单" name="first">
        <div class="info_from">
          <el-form ref="form" :model="form" label-width="80px">
            <p class="ti_p">填写表单以活得求救</p>
            <el-form-item label="经度">
              <el-input
                placeholder="显示经度"
                v-model="markerPo.lat"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="维度">
              <el-input
                placeholder="显示维度"
                v-model="markerPo.lng"
                :disabled="true"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="灾害类型">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="台风" name="type"></el-checkbox>
                <el-checkbox label="洪水" name="type"></el-checkbox>
                <el-checkbox label="恐怖袭击" name="type"></el-checkbox>
                <el-checkbox label="山体崩塌" name="type"></el-checkbox>
                <el-checkbox label="地震" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.more"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" class="from_submit">
                立即求救
              </el-button>
              <!-- <el-button @click="loc()" class="from_submit"> 定位 </el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="附近救助" name="second">
        <el-table :data="tableData" style="width: 100%" ref="element">
          <el-table-column prop="title" label="名称" width="300">
          </el-table-column>
          <el-table-column prop="address" label="地址以及相关道路" width="300">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="200">
          </el-table-column>
          <el-table-column prop="city" label="城市" width="200">
          </el-table-column> </el-table
      ></el-tab-pane>
      <el-tab-pane label="自查救助站" name="third">
        <div class="cheackself">
          <p>输入完成自动搜索</p>
          <el-input v-model="location" placeholder="请输入地区">
            <template slot="prepend">地区</template>
          </el-input>
          <el-input v-model="keyword" placeholder="请输入关键词">
            <template slot="prepend">关键字</template>
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="请求物资" name="four">
        <div class="info_from">
          <el-form ref="form" :model="form" label-width="80px">
            <p class="ti_p">填写表单以获得物资</p>
            <el-form-item label="经度">
              <el-input
                placeholder="显示经度"
                v-model="markerPo.lat"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="维度">
              <el-input
                placeholder="显示维度"
                v-model="markerPo.lng"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input placeholder="显示电话" v-model="tel"> </el-input>
            </el-form-item>
            <el-form-item label="需要什么">
              <el-input type="textarea" v-model="AskWhat"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="AskResources()"
                class="from_submit"
              >
                立即求救
              </el-button>
              <!-- <el-button @click="loc()" class="from_submit"> 定位 </el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<style>
@import url("./../../scss/SaveMe.css");
</style>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView"; //地图视图
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch"; //搜索
import BmMarker from "vue-baidu-map/components/overlays/Marker"; //点标注
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow"; //标注弹窗

const axios = require("axios");
export default {
  // name: "Home",
  components: {
    BaiduMap,
    BmView,
    BmLocalSearch,
    BmMarker,
    BmInfoWindow,
  },

  data() {
    return {
      storeName: "",
      center: {
        //经纬度
        lng: 30.0132,
        lat: 106.2638,
      },
      nearby: {
        center: {
          lng: 30.017466,
          lat: 106.254872,
        },
        radius: 1000,
      },

      zoom: 3, //地图展示级别
      //----------检索字符串--------------
      location: "重庆",
      keyword: "避难所",
      markerPo: {
        lng: 30.0132,
        lat: 106.2638,
      },
      isShowPanel: false,
      isShowInfo: false,
      markerIcon: "", //标注图片
      address: "",
      tableData: [],
      //-------------表格数据-----------------
      form: {
        type: [],
        more: "",
      },
      tab_h: "",
      //------------手动标记点--------------------
      bm_show: false,
      my_position: { lng: 0, lat: 0 },
      //-----------要物资------------------------
      tel: "",
      AskWhat: "",
    };
  },

  mounted() {
    this.$message({
      message: "右键单击，显示鼠标对应的坐标",
      duration: 1750,
    });
  },
  methods: {
    clickBmap(val) {
      this.location = val.currentTarget.bh;
      // console.log("56" + String(val.currentTarget.bh));
      // console.log(val);
      //右击鼠标更新坐标
      this.markerPo = val.point;
      //标记点出现
      this.bm_show = true;
      this.my_position.lng = val.point.lng;
      this.my_position.lat = val.point.lat;
      //方圆信息更新
      this.nearby.lng = val.point.lng;
      this.nearby.lat = val.point.lat;
      //弹出信息框
      const click_msg = this.$createElement;
      this.$notify({
        title: "经纬度更新",
        message: click_msg(
          "i",
          { style: "color: teal" },
          String("经度:" + val.point.lng + " 维度:" + val.point.lat)
        ),
      });
      // 死亡的表格为空校验------------------------------------------------
      if (String(this.$refs.element.$el.innerText).indexOf("暂无数据") != -1) {
        this.$message({
          message: "如果没有结果，请尝试细化地址，或者该地区没有救助站",
          type: "warning",
        });
      }
      console.log(this.$refs.element.$el.innerText);
    },

    showPanel() {
      //点击标注出现弹框
      this.isShowPanel = !this.isShowPanel;
    },

    infoWindowClose() {
      //弹框关闭
      this.isShowInfo = false;
    },

    infoWindowOpen() {
      //弹框打开
      this.isShowInfo = true;
    },

    dragend(val) {
      //标注拖拽完成获取坐标信息
      this.markerPo = val.point;
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      geocoder.getLocation(val.point, (rs) => {
        this.address = rs.address;
      });
    },

    searchcomplete(arr) {
      // console.log(arr);
      this.isShowPanel = true;
      // console.log(arr.Ir);
      // console.log("23333");
      this.tableData = arr.Ir;
    },
    //-------------------------提交函数
    onSubmit() {
      if (
        this.markerPo.lat != 106.2638 &&
        this.markerPo.lng != 30.0132 &&
        this.markerPo.lat != "" &&
        this.markerPo.lng != ""
      ) {
        axios({
          method: "POST",
          url: "http://localhost:3000/save_msg",
          data: {
            lng: this.markerPo.lat,
            lat: this.markerPo.lng,
            type: this.form.type,
            more: this.form.more,
          },
        }).then((response) => {
          console.log(response.data);
          // 清空表单
          this.markerPo.lat = "";
          this.markerPo.lng = "";
          this.form.type = "";
          this.form.more = "";
          //成功信息
          this.$message({
            message: "提交成功",
            type: "success",
          });
        });
      } else {
        //失败信息
        this.$message.error("请右键点击地图获取经纬度");
      }
    },
    // ------------------------请求物资
    AskResources() {
      if (
        this.markerPo.lat != 106.2638 &&
        this.markerPo.lng != 30.0132 &&
        this.markerPo.lat != "" &&
        this.markerPo.lng != ""
      ) {
        axios({
          method: "POST",
          url: "http://localhost:3000/AskResources",
          data: {
            lng: this.markerPo.lat,
            lat: this.markerPo.lng,
            tel: this.tel,
            AskWhat: this.AskWhat,
          },
        }).then((response) => {
          // console.log(response.data);
          // 清空表单
          this.markerPo.lat = "";
          this.markerPo.lng = "";
          this.tel = "";
          this.AskWhat = "";
          //成功信息
          this.$message({
            message: "提交成功",
            type: "success",
          });
        });
      } else {
        //失败信息
        this.$message.error("请右键点击地图获取经纬度");
      }
    },
  },
};
</script>
