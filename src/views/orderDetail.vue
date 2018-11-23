<template>
    <div>
        <h1>oredr detail</h1>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>订单编号</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.orderId}}</span>
            </mu-col>
        </mu-row>

        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>订单状态</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.orderState}}</span>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>商品名称</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.productTitle}}</span>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>商品图片</span>
            </mu-col>
            <mu-col span=8>
                <img class="orderImg" :src="orderDetail.productImg">
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>商品单价</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.productPrice}}</span>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>商品数量</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.sums}}</span>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>商品款式</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.typeSpecification}}</span>
            </mu-col>
        </mu-row>

        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>快递价格</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.carriagePrice}}</span>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>总价</span>
            </mu-col>
            <mu-col span=8>
                <span v-if="!editType">{{orderDetail.sumPrice}}</span>
                <mu-text-field v-else v-model="orderDetail.sumPrice"></mu-text-field>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>支付时间</span>
            </mu-col>
            <mu-col span=8>
                <span>{{orderDetail.payTime}}</span>
            </mu-col>
        </mu-row>

        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>收货人</span>
            </mu-col>
            <mu-col span=8>
                <span v-if="!editType">{{orderDetail.sendName}}</span>
                <mu-text-field v-else v-model="orderDetail.sendName"></mu-text-field>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>收货人联系方式</span>
            </mu-col>
            <mu-col span=8>
                <span v-if="!editType">{{orderDetail.sendTel}}</span>
                <mu-text-field v-else v-model="orderDetail.sendTel"></mu-text-field>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <span>收货地址</span>
            </mu-col>
            <mu-col span=8>
                <span v-if="!editType">{{orderDetail.sendAddress}}</span>
                <mu-text-field v-else v-model="orderDetail.sendAddress"></mu-text-field>
            </mu-col>
        </mu-row>
        <mu-row gutter class="row-container">
            <mu-col span=3>
                <mu-button color='primary'>去发货</mu-button>
            </mu-col>
            <mu-col span=8>
                <mu-text-field label='快递单号' v-model="expressid"></mu-text-field>
                <mu-text-field label='快递公司' v-model="expresscompany"></mu-text-field>
                <mu-button color='success'>确认发货</mu-button>
            </mu-col>
        </mu-row>
        <mu-row class="row-container">
            <mu-col span='3'>
                <mu-button color='#1565c0' @click="edidOrder">{{editbtnText}}</mu-button>
            </mu-col>
        </mu-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      editType:false,
      canEdit:false,
      orderDetail: {},
      expressid:'',
      expresscompany:'',
      editbtnText:'修改订单'
    };
  },
  methods: {
    getOrderDetail() {
      this.axios
        .get(
          "http://192.168.0.104:8080/WebAppService/orders/getorderdetails?orderid=201811131710275526175"
        )
        .then(response => {
          var orderDetail = response.data.data.orderDetails;
          switch (orderDetail.orderState) {
            case 1:{
                orderDetail.orderState = "待付款";
                this.canEdit=true
            }
              
            case 2:
              orderDetail.orderState = "待发货";
            case 3:
              orderDetail.orderState = "待收货";
            case 4:
              orderDetail.orderState = "待评价";
            case 5:
              orderDetail.orderState = "已评价";
            case 6:
              orderDetail.orderState = "已取消";
          }
          this.orderDetail = orderDetail;
          console.log("orderDetail", orderDetail);
        });
    },
    edidOrder(){
        this.editType = !this.editType
        if(this.editType == false){
            this.editbtnText = '提交修改'
        }
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
.row-container{
    margin: 30px;
}
</style>
