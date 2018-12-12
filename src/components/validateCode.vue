<template>
  <div>
    <mu-row>
      <mu-col span='3'><span>手机号</span></mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="phone" disabled></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span='3'><span>验证码</span></mu-col>
      <mu-col span='9'>
        <mu-text-field class="code-content" v-model="code" @change="change"></mu-text-field>
        <mu-button
            color="warning"
            :disabled='idCodeType'
            @click="getIdcode"
        >获取验证码{{IdCodeTime}}</mu-button>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
   data(){
       return{
           idCodeType:false,
           code:'',
           IdCodeTime:'',
           phone:localStorage.getItem('myPhone')
       }
   },
  methods: {
    getIdcode() {
      console.log('jiaoyn',this.phone)
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
    setIdCodeTimeout() {
      this.IdCodeTime = 60;
      var timeOut1 = setInterval(() => {
        if (this.IdCodeTime > 1) {
          this.IdCodeTime = this.IdCodeTime - 1;
        } else {
          clearTimeout(timeOut1);
          this.idCodeType = false;
          this.IdCodeTime = "";
        }
      }, 1000);
    },
    change(){
        let childprops={
            phone:this.phone,
            code:this.code
        }
      this.$emit('listenchild',childprops)
    }
  },
  mounted(){
  },
};
</script>
<style scoped>
.code-content{
    width: 128px
}
</style>