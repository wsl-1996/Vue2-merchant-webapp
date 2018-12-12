<template>
  <div>
    <div class="div-bgpaper">
      <mu-row>
        <mu-col offset='10'>
          <mu-button
            icon
            @click="gointoSettings"
          >
            <mu-icon value='settings'></mu-icon>
          </mu-button>
        </mu-col>
      </mu-row>
      <p class="namecontent">{{merchantInfo.name}}</p>
      <mu-row justify-content="center">
        <mu-avatar
          size='56'
          text-color="#2962ff"
          color="#90caf9"
        >
          <img :src="merchantInfo.headImg" alt="">
        </mu-avatar>
      </mu-row>
      <mu-tabs
        class="tab-content"
        :value.sync="active1"
        inverse
        color="#1a237e"
        indicator-color='#1a237e'
        text-color="rgba(0, 0, 0, .54)"
        center
      >
        <mu-tab>我的账户</mu-tab>
        <mu-tab>开通服务</mu-tab>
        <mu-tab>我的位置</mu-tab>
      </mu-tabs>
    </div>

    <div
      class="demo-text"
      v-if="active1 === 0"
    >
      <v-account
        :name='merchantInfo.name'
        :balance='merchantInfo.balance'
        :phone='merchantInfo.phone'
        :discription='merchantInfo.discription'
        :address='merchantInfo.address'
      ></v-account>
    </div>
    <div
      class="demo-text"
      v-if="active1 === 1"
    >
      <p>暂未开放</p>
    </div>
    <div
      class="demo-text"
      v-if="active1 === 2"
    >
    <mu-button @click="getlocationpoint">获取位置</mu-button>
    <p>经纬度：</p>
    <p>{{latitude}}</p>
    <p>{{longitude}}</p>
    </div>
  </div>
</template>

<script>
import account from "@/components/account";
export default {
  components: {
    "v-account": account,
  },
  data() {
    return {
      active1: 0,
       latitude:'',
        longitude:'',
      merchantInfo: {
        id: "",
        name: "",
        address: "",
        phone: "",
        accountname: "",
        accoutpass: "",
        discription: "",
        email: "",
        balance: "",
        headImg:'',
       
      }
    };
  },
  methods: {
    getMyInfo() {
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/my/getmyinfo", {
          params: {
            merchantid: localStorage.getItem("merchantId"),
            page: "0"
          },
          headers: {
            sessionid: localStorage.getItem("sessionId")
          }
        })
        .then(res => {
          console.log("getMyInfo res", res.data);
          this.merchantInfo = res.data.data.merchant;
          localStorage.setItem('myPhone',this.merchantInfo.phone)
        });
    },
    gointoSettings() {
      this.$router.push("userSettings");
    },

  getlocationpoint:function () {
      if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
              function (position) {
                 this.latitude = position.coords.latitude;//获取纬度
                 this.longitude = position.coords.longitude;//获取经度
                 console.log('经纬度',this.latitude,this.longitude)
              });
      }else{
         this.$alert("不支持定位功能");
      }
  }
  },
  mounted() {
    this.getMyInfo();
  }
};
</script>
<style>
.img-bg {
  width: 100%;
  height: 150px;
  opacity: 0.5;
}
.tab-content {
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.1);
}

.div-bgpaper{
  background-color: #4dd0e1;
  margin-top: -10px
}
.namecontent{
  color: #01579b;
  font-size: 20px;
  font-family:"幼圆";
  font-weight: 700
}
</style>
