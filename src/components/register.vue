<template>
  <div class="reg-container">
    <h1>我的信息</h1>

    <mu-row>
      <mu-col span='3'>商家名称</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="name"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>地址</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="address"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>手机号</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="phone"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>简要描述</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="discription"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>邮箱</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="email"></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col offset='8'>
        <mu-button
          color="primary"
          flat
          @click="commitReg"
        >提交</mu-button>

      </mu-col>
    </mu-row>
  </div>
</template>
<script>
export default {
  data() {
    return {

        name: "",
        address: "",
        phone: "",
        discription: "",
        email: ""
      
    };
  },
  methods: {
    commitReg(){
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
    } }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.reg-container {
  margin-bottom: 60px;
}
</style>