<template>
  <div>
    <mu-row class="row-container">
      <mu-col span='12'>
        <mu-button color="#26c6da" @click="createGoods" full-width>
          <mu-icon left value="add_circle_outline"></mu-icon>
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
          width: 115,
          align: "center",
          sortable: true
        }
      ],
      datalist: []
    };
  },
  methods: {
    handleSortChange({ name, order }) {
      this.list = this.list.sort(
        (a, b) => (order === "asc" ? a[name] - b[name] : b[name] - a[name])
      );
    },
    getProductList() {
      this.axios
          .get(
            this.GLOBAL.webappServerSrc+"/WebAppService/products/getgoodslist",
            {
              params: {
                merchantid: localStorage.getItem('merchantId')
              }
            }
          )
      // this.axios.get("/static/mock/goodsList.json")
      .then(response => {
        var goodsList = response.data.data.products;
        goodsList.forEach(element => {
          this.datalist.push({
            img:element.productFistImg,
            name: element.productName,
            price: element.price,
            type: '上线中',
            onlineTime: utils.timestampToTime(element.onlineTime),
            productid:element.id
          });
        });
      });
    },
    gotoDetail(productId) {
      this.$router.push("/goodsDetail/"+productId);
    },
    createGoods() {
      this.$router.push("/goodsDetail/-1");
    }
  },
  mounted() {
    this.getProductList()
    console.log(this.GLOBAL.webappServerSrc)
  },
};
</script>
<style>
.img-content {
  width: 100px;
  height: 100px;
}
.row-container {
  margin-top: 40px;
}
.paper-container{
  margin: 10px 0 60px 0;
}
</style>
