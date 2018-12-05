<template>
  <div>
    <mu-row class="first-row">
      <mu-col
        span='5'
        offset='7'
      >
        <mu-button
          flat
          color="primary"
          @click="usePassword"
        >{{commonRule.togglebtnText}}</mu-button>
      </mu-col>
    </mu-row>
    <mu-container>
      <mu-form
        ref="form"
        :model="validateForm"
        class="mu-demo-form"
      >
        <mu-form-item
          :label="commonRule.accountLabel"
          help-text="手机号/用户名"
        >
          <mu-text-field
            v-model="validateForm.username"
            :max-length="11"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="commonRule.pswLabel">
          <mu-text-field
            :type="commonRule.pswType"
            v-model="validateForm.password"
            :max-length="commonRule.pswMax"
          ></mu-text-field>
        </mu-form-item>
        <mu-row class="first-row">
          <mu-col span='6'>
            <mu-button
              color="warning"
              :disabled='idCodeType'
              @click="getIdcode"
              v-if="codebtnShow"
            >获取验证码{{IdCodeTime}}</mu-button>
          </mu-col>
          <mu-col span='6'>
            <mu-button
              color="primary"
              @click="submit"
            >登陆</mu-button>
          </mu-col>
        </mu-row>
        <!-- <mu-button @click="clear">重置</mu-button> -->
      </mu-form>
    </mu-container>
    <v-snackbar ref="vsnackbar"></v-snackbar>
  </div>
</template>

<script>
import util from "@/util/common.js";
import snackbar from '@/common/snackbar'
import md5 from "@/util/md5.js";
export default {
  data() {
    return {
      snColor:'warning',
      sstext:'请正确填写登录信息!',
      codebtnShow: true,
      idCodeType: false,
      IdCodeTime: "",
      validateForm: {
        username: "",
        password: "",
        isAgree: false
      },
      commonRule: {
        accountLabel: "手机号",
        pswLabel: "验证码",
        pswMax: 6,
        togglebtnText: "使用账号密码登陆",
        pswType: "number"
      },
      passwordRule: {
        accountLabel: "用户名",
        pswLabel: "密码",
        pswMax: 16,
        togglebtnText: "使用短信动态登陆",
        pswType: "password"
      },
      idCodeRule: {
        accountLabel: "手机号",
        pswLabel: "验证码",
        pswMax: 6,
        togglebtnText: "使用账号密码登陆",
        pswType: "number"
      }
    };
  },
  components:{
      'v-snackbar':snackbar
  },
  methods: {
    submit() {
      if (
        this.validateForm.password.toString().length == 6 &&
        this.codebtnShow
      ) {
        this.axios
          .post(
            this.GLOBAL.webappServerSrc +
              "/WebAppService/account/loginwithphone",
            {
              params: {
                phone: this.validateForm.username,
                code: this.validateForm.password
              }
            },
            {
              headers: {
                sessionid: localStorage.getItem("sessionId"),
                "Access-Control-Allow-Origin": "*"
              }
            }
          )
          .then( res => {
            if (res.data.failed) {
              this.$alert('登陆失败！验证码不正确')
              console.log("登陆失败！");
            } else {
              localStorage.setItem('merchantId',res.data.data.merchantId)
              this.linkToWebsocket()
              this.$router.push("index");
            }
          });
      } else if (
        this.codebtnShow == false &&
        this.validateForm.password.toString().length > 2
      ) {
        this.encryptPassword(this.validateForm.password)
        this.axios
          .post(
            this.GLOBAL.webappServerSrc +
              "/WebAppService/account/loginwithaccount",
            {
              params: {
                asword: this.validateForm.username,
                emall: this.validateForm.password
              }},
              {headers: {
                sessionid: localStorage.getItem("sessionId")
              }
            }
          )
          .then( res => {
            console.log("res", res);
            if (res.data.failed) {
              this.$alert('登陆失败！请检查您的用户名密码是否正确')
              console.log("登陆失败！");
            } else {
              localStorage.setItem('merchantId',res.data.data.merchantId)
              this.linkToWebsocket()
              this.$router.push("index");
            }
          });
      }else{
        console.log(this.sstext)
        this.snColor='warning'
        this.sstext='请正确填写登录信息！'
        this.$refs.vsnackbar.openColorSnackbar(this.snColor,this.sstext)
      }
    },
    getIdcode() {
      if (this.validateForm.username)
        this.axios
          .get(
            this.GLOBAL.commonServerSrc +
              "/CommonService/SMS/getVerificationCode",
            {
              params: {
                phone: this.validateForm.username
              },
              headers: {
                sessionid: localStorage.getItem("sessionId")
              }
            }
          )
          .then( res => {
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
    setIdCodeTimeout() {
      this.IdCodeTime = 10;
      var timeOut1 = setInterval(() => {
        if (this.IdCodeTime > 1) {
          this.IdCodeTime = this.IdCodeTime - 1;
          console.log(this.IdCodeTime);
        } else {
          clearTimeout(timeOut1);
          this.idCodeType = false;
          this.IdCodeTime = "";
        }
      }, 1000);
    },
    usePassword() {
      this.codebtnShow = !this.codebtnShow;
      if (this.commonRule.pswMax == 6) {
        this.commonRule = this.passwordRule;
      } else {
        this.commonRule = this.idCodeRule;
      }
    },
    setSessionId() {
      localStorage.setItem("sessionId", util.guid());
      console.log("sessionId =", localStorage.getItem("sessionId"));
    },
    linkToWebsocket(){
        console.log('建立socket连接,监听消息')
        console.log('this.$root.webSocket',this.$root.webSocket.ws)
      var data = {};
        data["messageFrom"] = localStorage.getItem('merchantId');
        data["messageType"]="-1";
        this.$root.webSocket.ws.send(JSON.stringify(data));  

    },
    encryptPassword(str) {   
      str = md5.hex_md5(str)
      this.validateForm.password = str
      console.log('jiamihou',str);
      console.log('psw',this.validateForm.password);
    },
    checkSession() {
      let sessionid = localStorage.getItem("sessionId")
      if(sessionid==null){
        this.snColor='#7c4dff'
        this.sstext='欢迎来到商家后台'
        this.$refs.vsnackbar.openColorSnackbar(this.snColor,this.sstext)
        this.setSessionId();
      }else{
      this.axios.get(
            this.GLOBAL.webappServerSrc + "/WebAppService/account/issessionexpired",
            {
              params: {
                merchantid:localStorage.getItem('merchantId')
                
              },
              headers: {
                sessionid: sessionid
              }
            }
          ).then(res=>{

            if(res.data.failed){
                this.snColor='#7c4dff'
                this.sstext='登录信息失效，请重新登陆'
                this.$refs.vsnackbar.openColorSnackbar(this.snColor,this.sstext)
                this.setSessionId();
            }else{
                this.linkToWebsocket()
                this.$router.push("index");
            }          
          })  
      }

    }
  },
  mounted() {
    this.checkSession()
    // this.linkToWebsocket()
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.flex-wrapper {
  width: 100%;
  height: 56px;
  margin-top: 8px;
}
.flex-demo {
  width: 200px;
  height: 32px;
  background-color: #e0e0e0;
  text-align: center;
  line-height: 32px;
  margin-left: 8px;
}
.first-row {
  margin-bottom: 50px;
}
</style>
