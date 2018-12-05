<template>
  <div class="div-container">

    <mu-expansion-panel>
      <div slot="header">我的账户信息</div>
      <mu-list>
        <mu-list-item>
          <mu-list-item-title>商户名</mu-list-item-title>
          <mu-list-item-title>xxxxx</mu-list-item-title>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-title>描述</mu-list-item-title>
          <mu-list-item-title>{{discription}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-title>地址</mu-list-item-title>
          <mu-list-item-title>{{address}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-title>联系方式</mu-list-item-title>
          <mu-list-item-title>{{phone}}</mu-list-item-title>
        </mu-list-item>
      </mu-list> 
    </mu-expansion-panel>
    <mu-expansion-panel>
      <div slot="header">我的钱包</div>
      <mu-row>
        <mu-col span='3'>
          <mu-chip
            class="demo-chip"
            color="#ffe0b2"
            text-color="#ef6c00"
          >
            <mu-avatar :size="32" text-color="#ef6c00"
            color="#ffb74d">
              ￥
            </mu-avatar>
            余额
          </mu-chip>
        </mu-col>
        <mu-col span='9'>
          <span>{{balance}}</span>
        </mu-col>
      </mu-row>

      <mu-list v-for="(item,i) in billInfo" :key="i">
        <mu-list-item >
          <mu-list-item-title>{{item.balance}}</mu-list-item-title>
          
          <mu-list-item-title>{{item.date}}</mu-list-item-title>
          
          <mu-list-item-title>{{item.description}}</mu-list-item-title>
          
          <mu-list-item-title>{{item.money}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>

      <mu-button
        slot="action"
        flat
        color="primary"
      >提现</mu-button>
    </mu-expansion-panel>
    <mu-expansion-panel>
      <div slot="header">待确认订单</div>
    </mu-expansion-panel>
  </div>

</template>

<script>
export default {
  props:['balance','address','phone','discription'],
  data(){
    return{
        billInfo:null
    }
  },
  methods: {
    getBillInfo() {
      this.axios.get(
        this.GLOBAL.webappServerSrc + "/WebAppService/my/getmybillinfo",
        {
          params: {
            merchantid: localStorage.getItem("merchantId"),
            page: "0"
          },
          headers: {
            sessionid: localStorage.getItem("sessionId")
          }
        }
      ).then(res => {
          console.log("getBillInfo res", res.data);
          this.billInfo = res.data.data.bill
        });
    },
    getmybillinfounconfirmed(){
      this.axios
        .get(
          this.GLOBAL.webappServerSrc +
            "/WebAppService/my/getmybillinfounconfirmed",
          {
            params: {
              merchantid: localStorage.getItem("merchantId")
            },
            headers: {
              sessionid: localStorage.getItem("sessionId")
            }
          }
        )
        .then(res => {
          console.log("getmybillinfounconfirmed res", res.data);
        });
    }
  },
  mounted() {
    this.getBillInfo();
    this.getmybillinfounconfirmed()
  }
};
</script>
<style>
.div-container{
  margin-bottom: 60px;
}
</style>