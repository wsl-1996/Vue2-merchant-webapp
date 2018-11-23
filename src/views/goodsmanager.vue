<template>
  <mu-container >
    <mu-row class="row-container">
      <mu-col span='3' offset='9'>
        <mu-button color="primary" @click="createGoods">
          <mu-icon left value="grade"></mu-icon>
          创建商品
        </mu-button>
      </mu-col>
    </mu-row>

    <mu-paper class="paper-container" :z-depth="1">
      <mu-data-table :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="datalist">
        <template slot-scope="scope">
          <td @click="gotoDetail(scope.row.productid)"><img :src="scope.row.img" class="img-content" /></td>
          <td class="is-right">{{scope.row.name}}</td>
          <td class="is-right">{{scope.row.price}}</td>
          <td class="is-right">{{scope.row.type}}</td>
          <td class="is-right">{{scope.row.onlineTime}}</td>
        </template>
      </mu-data-table>
    </mu-paper>
  </mu-container>
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
        { title: "商品主图", width: 200, name: "img" },
        {
          title: "名称",
          name: "name",
          width: 126,
          align: "center",
          sortable: true
        },
        {
          title: "价格",
          name: "price",
          width: 126,
          align: "center",
          sortable: true
        },
        {
          title: "状态",
          name: "type",
          width: 126,
          align: "center",
          sortable: true
        },
        {
          title: "创建日期",
          name: "onlineTime",
          width: 126,
          align: "center",
          sortable: true
        }
      ],
      datalist: [
        {
          img:
            "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png",
          name: "alpha蛋智能语音机器人",
          price: "123",
          type: "上线中",
          onlineTime: "2018/7/8",
          productid: "001"
        }
      ]
    };
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort(
        (a, b) => (order === "asc" ? a[name] - b[name] : b[name] - a[name])
      );
    },
    getProductList() {
      this.axios.get("/static/mock/goodsList.json").then(response => {
        var goodsList = response.data.data.products;
        goodsList.forEach(element => {
          this.datalist.push({
            img:element.productFistImg,
            name: element.productName,
            price: element.price,
            type: '上线中',
            onlineTime: element.onlineTime,
            productid:element.id
          });
        });
      });
    },
    gotoDetail() {
      this.$router.push("/goodsDetail");
    },
    createGoods() {
      this.$router.push("/goodsDetail");
    }
  },
  mounted() {
    this.getProductList()
  },
};
</script>
<style>
.img-content {
  width: 100px;
  height: 100px;
}
.row-container {
  margin: 30px;
}
.paper-container{
  margin: 60px 0;
}
</style>
