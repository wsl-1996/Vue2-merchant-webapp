<template>
  <div class="div-container">

    <mu-expansion-panel>
      <div slot="header">我的账户信息</div>
      <mu-list>
        <mu-list-item>
          <mu-list-item-title>商户名</mu-list-item-title>
          <mu-list-item-title>{{name}}</mu-list-item-title>
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
            <mu-avatar
              :size="32"
              text-color="#ef6c00"
              color="#ffb74d"
            >
              ￥
            </mu-avatar>
            余额
          </mu-chip>
        </mu-col>
        <mu-col span='9'>
          <span style="color: #ff6f00">{{balance}}</span>
        </mu-col>
      </mu-row>
      <mu-button
        slot="action"
        flat
        color="primary"
        @click="gotoCash"
      >提现</mu-button>
    </mu-expansion-panel>

    <mu-expansion-panel>
      <div slot="header">流水历史</div>
      <mu-list
        v-for="(item,i) in billInfo"
        :key="i"
      >

        <mu-list-item
          avatar
          :ripple="false"
          button
        >
          <mu-list-item-content>
            <mu-list-item-title>{{item.description}}</mu-list-item-title>
            <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">当前余额：{{item.balance}}</mu-list-item-sub-title>
            <mu-list-item-sub-title
              style="color: #4caf50"
              v-if="item.in_out==0"
            >+{{item.money}}</mu-list-item-sub-title>
            <mu-list-item-sub-title
              style="color: #d84315"
              v-else
            >-{{item.money}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-after-text>{{item.date}}</mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider class="divider-content"></mu-divider>
      </mu-list>
    </mu-expansion-panel>

    <mu-expansion-panel>
      <div slot="header">待确认订单</div>
      <mu-list
        textline="three-line"
        v-for="(item,i) in uncomfirmedBill"
        :key='i'
      >
        <mu-list-item
          avatar
          :ripple="false"
          button
        >
          <mu-list-item-action>
            <img :src="item.product_fist_img">
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{item.product_name}}</mu-list-item-title>
            <mu-list-item-sub-title>
              <span class='date-span'>{{item.cashback_date}}</span>
              <span>{{item.ORDER_id}}</span>
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>$43</mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </mu-list>
    </mu-expansion-panel>
  </div>

</template>

<script>
import utils from "@/util/utils.js";
export default {
  props: ["balance", "address", "phone", "discription",'name'],
  data() {
    return {
      billInfo: null,
      uncomfirmedBill: null
    };
  },
  methods: {
    getBillInfo() {
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/my/getmybillinfo", {
          params: {
            merchantid: localStorage.getItem("merchantId"),
            page: "0"
          },
          headers: {
            sessionid: localStorage.getItem("sessionId")
          }
        })
        .then(res => {
          console.log("getBillInfo res", res.data);
          this.billInfo = res.data.data.bill;
          this.billInfo.map((value, index) => {
            value.date = utils.timestampToTime(value.date);
          });
        });
    },
    getmybillinfounconfirmed() {
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
          this.uncomfirmedBill = res.data.data.billUnconfirmed;
          this.uncomfirmedBill.map((value, index) => {
            value.cashback_date = utils.timestampToTime(value.cashback_date);
          });
        });
    },
    gotoCash(){
      this.$router.push('/withdrawCash')
    }
  },
  mounted() {
    this.getBillInfo();
    this.getmybillinfounconfirmed();
  }
};
</script>
<style>
.div-container {
  margin-bottom: 60px;
}
.date-span {
  color: rgba(0, 0, 0, 0.87);
  display: block;
}
.divider-content{
  margin-top: 10px
}
</style>