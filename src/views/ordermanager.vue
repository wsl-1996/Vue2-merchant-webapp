<template>
  <div>
    <mu-paper>
      <mu-data-table :columns='columns' :sort.sync="sort" :data='datalist'>

          <template slot-scope="scope">
            <td  @click="gotoOrderDetail(scope.row.orderId)">{{scope.row.orderId}}</td>
            <td @click="gotoOrderDetail(scope.row.orderId)">{{scope.row.userId}}</td>
            <td @click="gotoOrderDetail(scope.row.orderId)">{{scope.row.sendAddress}}</td>
            <td @click="gotoOrderDetail(scope.row.orderId)">{{scope.row.orderTime}}</td>
            <td @click="gotoOrderDetail(scope.row.orderId)">{{scope.row.orderState}}</td>           
          </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
import utils from '@/util/utils.js'
export default {
  data() {
    return {
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        { title: "订单编号", name: "orderId" },
        { title: "用户id", name: "userId" },
        { title: "收货地址", name: "sendAddress" },
        { title: "创建时间", name: "orderTime" ,width:115},
        { title: "状态", name: "orderState" }
      ],
      datalist: []
    };
  },
  methods: {
    getOrderList() {
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/orders/getorderlist", {
          params: {
            page: 0,
            merchantid: localStorage.getItem('merchantId')
          }
        })
        .then(response => {
          var orderList = response.data.data.orders;
          console.log("orderlist", orderList);
          orderList.forEach(element => {
             switch (element.state) {
            case 1: 
              element.state = "待付款";
              break;
            case 2:
              element.state = "待发货";
              break;
            case 3:
              element.state = "待收货";
              break;
            case 4:
              element.state = "待评价";
              break;
            case 5:
              element.state = "已评价";
              break;
            case 6:
              element.state = "已取消";
              break;
          }
          
            console.log('element.state',element.state)
            this.datalist.push({
              orderId: element.id,
              userId: element.USER_id,
              sendAddress: element.send_address,
              orderTime: utils.timestampToTime(element.order_time),
              orderState: element.state
            });
          });
          console.log("datalist", this.datalist);
        });
    },
    gotoOrderDetail(id) {
      console.log("11111");
      this.$router.push("/orderDetail/"+id);
    },
    testclick(){
      console.log('22222');

    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>

<style scoped>

</style>
