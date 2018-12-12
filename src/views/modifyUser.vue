<template>
  <div class="div-container">
       <v-appbar
      iconvalue='keyboard_arrow_left'
      barTitle='用户中心'
    ></v-appbar>
    <mu-row>
      <mu-col span='3'><span>用户名</span></mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="account"></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span='3'><span>密码</span></mu-col>
      <mu-col span='9'>
        <mu-text-field
          type='password'
          v-model="pass"
        ></mu-text-field>
      </mu-col>
    </mu-row>
    <v-validatecode v-on:listenchild="showchilddata"></v-validatecode>
    <mu-row>
      <mu-col offset='7'>
      <mu-button @click="commitmodify">提交</mu-button></mu-col>
    </mu-row>
  </div>
</template>

<script>
import appbar from "@/common/_appbar";
import md5 from "@/util/md5.js";
import validatecode from "@/components/validateCode";
export default {
  components: {
    "v-validatecode": validatecode,
    "v-appbar": appbar,
  },
  data() {
    return {
      account: "",
      pass: "",
      verifycode: "",
      phone: ""
    };
  },
  methods: {
    encryptPassword(str) {
      str = md5.hex_md5(str);
      this.pass = str;
      console.log("jiamihou", str);
      console.log("psw", this.pass);
    },
    commitmodify() {
      this.encryptPassword(this.pass);
      this.axios
        .post(
          this.GLOBAL.webappServerSrc + "/WebAppService/my/setmyaccount",
          {
            params: {
              merchantid: localStorage.getItem("merchantId"),
              account: this.account,
              pass: this.pass,
              verifycode: this.verifycode,
              phone: this.phone
            }
          },
          {
            headers: {
              sessionid: localStorage.getItem("sessionId")
            }
          }
        )
        .then(res => {
          if (res.data.failed) {
            this.$alert("修改失败，请重试！");
          }else{
            this.$alert("修改成功");
            this.account = "";
            this.pass = "";
            this.verifycode = "";
            this.phone = "";
          }
        });
    },
    showchilddata(data) {
      console.log("data", data);
      this.verifycode = data.code;
      this.phone= data.phone
}
  },
  mounted() {}
};
</script>
<style>
.text-field {
  width: 128px;
}

</style>