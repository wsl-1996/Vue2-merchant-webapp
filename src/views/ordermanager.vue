<template>
  <div>
    <h1>order-manager</h1>
    <mu-paper>
      <mu-data-table :columns='columns' :sort.sync="sort" :data='datalist'>
          <template slot-scope="scope">
            <td  @click="gotoOrderDetail(scope.row.orderId)">{{scope.row.orderId}}</td>
            <td @click="testclick">{{scope.row.userId}}</td>
            <td>{{scope.row.sendAddress}}</td>
            <td>{{scope.row.orderTime}}</td>
            <td>{{scope.row.orderState}}</td>
          </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
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
        { title: "创建时间", name: "orderTime" },
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
            this.datalist.push({
              orderId: element.id,
              userId: element.USER_id,
              sendAddress: element.send_address,
              orderTime: element.order_time,
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