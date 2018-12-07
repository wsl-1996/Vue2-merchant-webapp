<template>
  <div>
    <v-appbar
      iconvalue='chevron_left'
      barTitle='提现中心'
    ></v-appbar>
    <mu-row>
      <mu-col span='3'><span>户名</span></mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="bankaccount"></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span='3'><span>银行卡号</span></mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="creditcardnumber"></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span='3'><span>开户银行行网点</span></mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="openbank"></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span='3'><span>本次提现金额</span></mu-col>
      <mu-col span='9'>
        <mu-text-field
          :placeholder='sumExplain'
          v-model="sum"
          prefix="￥"
        ></mu-text-field>
      </mu-col>
    </mu-row>
    <v-validatecode
      v-on:listenchild="showchilddata"
      :phone='this.merchantInfo.phone'
    ></v-validatecode>
    <mu-row class="tips-text">
      <mu-col>Tips: 提现需要手续费（每10000元收取手续费2元）</mu-col>
    </mu-row>
    <mu-row>
      <mu-col offset='7'>
        <mu-button @click="gocash">提现</mu-button>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import appbar from "@/common/_appbar.vue";
import validatecode from "@/components/validateCode";
export default {
  components: {
    "v-validatecode": validatecode,
    "v-appbar": appbar
  },
  data() {
    return {
      sumExplain: "",
      merchantInfo: null,
      creditcardnumber: "",
      openbank: "",
      bankaccount: "",
      phone: "",
      code: "",
      sum: ""
    };
  },
  methods: {
    showchilddata(data) {
      console.log("data", data);
      this.phone = data.phone;
      this.code = data.code;
    },
    gocash() {
      if (this.validateInfo()) {
        this.axios
          .post(
            this.GLOBAL.webappServerSrc + "/WebAppService/my/withdrawmoney",
            {
              params: {
                merchantid: localStorage.getItem("merchantId"),
                creditcardnumber: this.creditcardnumber,
                openbank: this.openbank,
                bankaccount: this.bankaccount,
                phone: this.phone,
                code: this.code,
                sum: this.sum
              }
            },
            {
              headers: {
                sessionid: localStorage.getItem("sessionId")
              }
            }
          )
          .then(res => {
            if(res.data.failed){
              this.$alert('提现请求失败！')
            }else{
              
              this.$alert('提现发起成功，等待审核，7个工作日内转入银行账户')
              .then(()=>{
                this.$router.go(-1)
              })
            }
          });
      }
    },
    getMyInfo() {
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/my/getmyinfo", {
          params: {
            merchantid: localStorage.getItem("merchantId")
          },
          headers: {
            sessionid: localStorage.getItem("sessionId")
          }
        })
        .then(res => {
          this.merchantInfo = res.data.data.merchant;
          this.sumExplain = "最多不超过" + this.merchantInfo.balance;
        });
    },
    validateInfo() {
      if (this.sum > this.merchantInfo.balance) {
        this.$alert("金额超出范围");
        return false;
      }
      if (
        this.code == "" ||
        this.creditcardnumber == "" ||
        this.openbank == "" ||
        this.sum == "" ||
        this.bankaccount == ""
      ) {
        this.$alert("填写信息不能为空");
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.getMyInfo();
  }
};
</script>
<style>
.tips-text {
  color: #9e9e9e;
  margin-bottom: 10px;
}
</style>