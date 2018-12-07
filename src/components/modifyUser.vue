<template>
  <div>
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
      <mu-col></mu-col>
      <mu-button @click="commitmodify">提交</mu-button>
    </mu-row>
  </div>
</template>

<script>
import md5 from "@/util/md5.js";
import validatecode from "@/components/validateCode";
export default {
  components: {
    "v-validatecode": validatecode
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
          console.log("setmyaccount res", res.data);
          if (res.data.data == null) {
            this.$alert("修改成功");
            this.account = "wl";
            this.pass = "";
            this.verifycode = "";
            this.phone = "";
          }
        });
    },
    getIdcode() {
      if (this.phone)
        this.axios
          .get(
            this.GLOBAL.commonServerSrc +
              "/CommonService/SMS/getVerificationCode",
            {
              params: {
                phone: this.phone
              },
              headers: {
                sessionid: localStorage.getItem("sessionId")
              }
            }
          )
          .then(res => {
            console.log("res", res);
            if (res.data.failed == false) {
              console.log("发送验证码成功");
              this.idCodeType = true;
              this.setIdCodeTimeout();
            } else {
              console.log("发送验证码失败");
            }
          });
    },
    showchilddata(data) {
      console.log("data", data);
      this.validatecode = data.code;
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