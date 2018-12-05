<template>
  <div>
    <div :style="{backgroundImage: `url('http://resource.skqtec.com/product_75ShPSkW7sae')`}">
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
      <p>{{merchantInfo.name}}</p>
      <mu-row justify-content="center">
        <mu-avatar
          size='56'
          text-color="#2962ff"
          color="#90caf9"
        >
          {{merchantInfo.name.substring(0,1)}}
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
        <mu-tab>填写信息</mu-tab>
      </mu-tabs>
    </div>

    <div
      class="demo-text"
      v-if="active1 === 0"
    >
      <v-account
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
      <v-register></v-register>
    </div>
  </div>
</template>

<script>
import account from "@/components/account";
import register from "@/components/register";
export default {
  components: {
    "v-account": account,
    "v-register": register
  },
  data() {
    return {
      active1: 0,
      merchantInfo: {
        id: "",
        name: "",
        address: "",
        phone: "",
        accountname: "",
        accoutpass: "",
        discription: "",
        email: "",
        balance: ""
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
        });
    },
    gointoSettings() {
      this.$router.push("userSettings");
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
</style>
