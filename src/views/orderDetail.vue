<template>
  <div>
    <v-topbar iconvalue='chevron_left' barTitle='订单详情'></v-topbar>
    <v-tipsShow btnText='Tips' :showText='showText'></v-tipsShow>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>订单编号</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.orderId}}</span>
      </mu-col>
    </mu-row>

    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>订单状态</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.orderState}}</span>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>商品名称</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.productTitle}}</span>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>商品图片</span>
      </mu-col>
      <mu-col span=8>
        <img
          class="orderImg"
          :src="orderDetail.productImg"
        >
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>商品单价</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.productPrice}}</span>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>商品数量</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.sums}}</span>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>商品款式</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.typeSpecification}}</span>
      </mu-col>
    </mu-row>

    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>快递价格</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.carriagePrice}}</span>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>总价</span>
      </mu-col>
      <mu-col span=8>
        <span v-if="!editType">{{orderDetail.sumPrice}}</span>
        <mu-text-field
          v-else
          v-model="orderDetail.sumPrice"
        ></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>支付时间</span>
      </mu-col>
      <mu-col span=8>
        <span>{{orderDetail.payTime}}</span>
      </mu-col>
    </mu-row>

    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>收货人</span>
      </mu-col>
      <mu-col span=8>
        <span v-if="!editType">{{orderDetail.sendName}}</span>
        <mu-text-field
          v-else
          v-model="orderDetail.sendName"
        ></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>收货人联系方式</span>
      </mu-col>
      <mu-col span=8>
        <span v-if="!editType">{{orderDetail.sendTel}}</span>
        <mu-text-field
          v-else
          v-model="orderDetail.sendTel"
        ></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>收货地址</span>
      </mu-col>
      <mu-col span=8>
        <span v-if="!editType">{{orderDetail.sendAddress}}</span>
        <mu-text-field
          v-else
          v-model="orderDetail.sendAddress"
        ></mu-text-field>
      </mu-col>
    </mu-row>
    <mu-row
      gutter
      class="row-container"
    >
      <mu-col span=3>
        <span>物流信息</span>
      </mu-col>
      <mu-col span=8>
        <div v-if="!expressType">
          <mu-list>
            <mu-list-item>
              <mu-list-item-title>快递单号</mu-list-item-title>
              <mu-list-item-title>{{orderDetail.trackid}}</mu-list-item-title>
            </mu-list-item>
            <mu-list-item>
              <mu-list-item-title>快递公司</mu-list-item-title>
              <mu-list-item-title>{{orderDetail.trackcode}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-button
            v-if="!orderDetail.deliverTime"
            color='primary'
            @click="editExpress"
          >去发货</mu-button>
        </div>
        <div v-else>
          <mu-text-field
            label='快递单号'
            v-model="expressid"
          ></mu-text-field>
          <mu-text-field
            label='快递公司'
            v-model="expresscompany"
          ></mu-text-field>
          <mu-slide-picker
            :slots="expressSlots"
            :visible-item-count="5"
            :values="expressList" 
            @change="expressChange"
          ></mu-slide-picker>
          <mu-button
            color='success'
            @click="commitExpress"
          >确认发货</mu-button>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container">
      <mu-col span='3'>
        <mu-button
        v-if="canModify"
          :color='editbtnColor'
          @click="edidOrder"
        >{{editbtnText}}</mu-button>
      </mu-col>
    </mu-row>
    <v-snackbar
      :snActive='true'
      snType="warning"
      :snText='sntext'
    ></v-snackbar>
  </div>
</template>

<script>
import topbar from '@/common/_appbar.vue'
import snackbar from "@/common/snackbar";
import expressSort from "@/../static/ExpressCompanyTable.js";
import tipsShow from '@/components/tipsShow.vue'
export default {
  components: {
    "v-snackbar": snackbar,
    "v-topbar":topbar,
    "v-tipsShow":tipsShow
  },
  data() {
    return {
      canModify:false,
      showText:'只有还没有发货的订单才能修改！',
      editbtnColor:'#3f51b5',
      expressSlots: [
        {
          width: "100%",
          textAlign: "center",
          values: (() => {
            var arr = [];
            for (var key in expressSort.express_map.common) {
              console.log("keys", key, expressSort.express_map.common[key]);
              arr.push(expressSort.express_map.common[key]);
              console.log('arr',arr)
              
            }
            return arr;
          })()
        }
      ],
      expressList: ['宅急送'],
      expressType: false,
      editType: false,
      orderDetail: {},
      expressid: "",
      expresscompany: "",
      editbtnText: "修改订单",
      orderId: this.$route.params.orderId,
      sntext: "这里是orderdetail"
    };
  },
  methods: {
    getOrderDetail() {
      console.log("this.orderId props", this.orderId);
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/orders/getorderdetails", {
          params: {
            orderid: this.orderId
          }
        })
        .then(response => {
          if(response.data.failed){
             this.$alert('获取详情失败，请重试！')
          }else{
          var orderDetail = response.data.data.orderDetails;
          switch (orderDetail.orderState) {
            case 1: {
              orderDetail.orderState = "待付款";
              this.canModify = true;
              break;
            }

            case 2:
              orderDetail.orderState = "待发货";
              this.canModify = true;
              break;
            case 3:
              orderDetail.orderState = "待收货";
              break;
            case 4:
              orderDetail.orderState = "待评价";
              break;
            case 5:
              orderDetail.orderState = "已评价";
              break;
            case 6:
              orderDetail.orderState = "已取消";
              break;
          }
          if (orderDetail.trackid == null) {
            orderDetail.trackid = "暂无物流信息";
          }
          this.orderDetail = orderDetail;
          console.log("orderDetail", orderDetail);
          }

        })
        .catch(error => {
          console.log("getorderdetails error", error);
        });
    },
    edidOrder() {
      this.editType = !this.editType;
      if (this.editType == false) {
        this.editbtnColor = '#4caf50'
        this.editbtnText = "提交修改";
      } else {
        this.axios
          .post(this.GLOBAL.webappServerSrc + "/WebAppService/orders/editorder", {
            params: {
              orderId: this.orderId,
              sendAddress: this.orderDetail.sendAddress,
              sendTel: this.orderDetail.sendTel,
              sendName: this.orderDetail.sendName,
              sumPrice: this.orderDetail.sumPrice
            }
          })
          .then((req, res) => {
            if (res.data.failed){
              this.$alert('修改失败，请重试！')
            }else{
              this.$alert('修改成功！')
              this.editbtnColor = '#00e5ff'
            this.editbtnText = "修改完成";
            }
          });
      }
    },
    commitExpress() {
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/orders/delivergoods", {
          params: {
            orderid: this.orderId,
            trackcode: this.expressid,
            trackid: this.expresscompany
          }
        })
        .then((res) => {
           if (res.data.failed){
              this.$alert('发货失败，请重试！')
            }else{
              this.$alert('发货成功！')
            }
        });
    },
    editExpress() {
      this.expressType = true;
    },
    expressChange(value,index){
        
        this.expresscompany = value
        console.log(this.expresscompany)
    }
  },
  mounted() {
    this.getOrderDetail();
  }
};
</script>

<style>
.orderImg {
  width: 100px;
  height: 100px;
}
.row-container {
  margin: 30px;
}
</style>
