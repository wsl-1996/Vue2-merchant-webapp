<template>
  <div>
    <mu-row class="row-container">
      <mu-col span='9'>
        <mu-button
        class="tips-btn"
          color="#26c6da"
          @click="createGoods"
          full-width
        >
          <mu-icon
            left
            value="add_circle_outline"
          ></mu-icon>
          创建商品
        </mu-button>
      </mu-col>
      
      <mu-col span='3'>
    <mu-button class="tips-btn" @click="show1=!show1" color='#4dd0e1' flat>Tips</mu-button></mu-col>
    </mu-row>
    <mu-row>
    </mu-row>
      <mu-slide-left-transition>
      <div class="mu-transition-box mu-primary-color mu-inverse" v-show="show1">可左右滑动，浏览全部数据</div>
    </mu-slide-left-transition>
    <mu-paper
      class="paper-container"
      :z-depth="1"
    >
      <mu-data-table
        :columns="columns"
        :sort.sync="sort"
        @sort-change="handleSortChange"
        :data="datalist"
      >
        <template slot-scope="scope">
          <td @click="gotoDetail(scope.row.productid)"><img
              :src="scope.row.img"
              class="img-content"
            /></td>
          <td class="is-right" @click="gotoDetail(scope.row.productid)">{{scope.row.name}}</td>
          <td class="is-right" @click="gotoDetail(scope.row.productid)">{{scope.row.price}}</td>
          <td class="is-right" @click="gotoDetail(scope.row.productid)">{{scope.row.type}}</td>
          <td class="is-right" @click="gotoDetail(scope.row.productid)">{{scope.row.onlineTime}}</td>
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
      show1:false,
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
      console.log('list is ?',this.datalist)
      this.datalist = this.datalist.sort(
        (a, b) => {
          console.log('a,b',a[name])
          
          if( typeof a[name] == 'string' && a[name].search('线')!=-1){
            return (order === "asc" ? a.s_type - b.s_type : b.s_type - a.s_type)
          }else if( typeof a[name] == 'string' && a[name].search('-')!=-1){
             return (order === "asc" ? a.s_onlineTime - b.s_onlineTime : b.s_onlineTime - a.s_onlineTime)
          }
          
          else{
            return (order === "asc" ? a[name] - b[name] : b[name] - a[name])
          }
        }
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
      .then(response => {
        var goodsList = response.data.data.products;
        goodsList.forEach(element => {
          this.datalist.push({
            img:element.productFistImg,
            name: element.productName,
            price: element.price,
            type: setProductState(element.productState),
            onlineTime: utils.timestampToTime(element.onlineTime),
            productid:element.id,
            s_type : element.productState,
            s_onlineTime : element.onlineTime
          });
        });
      });
      function setProductState(state){
        switch(state){
                case 0:
                return '未上线' ;break;
                case 1:
                return '已上线' ;break;
                case 2:
                return '已下线' ;break;
      }
    }
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
.paper-container {
  margin: 10px 0 60px 0;
}

.tips-btn{
  margin: 5px 0
}
.mu-transition-box {
  min-width: 200px;
  height: 100px;
  margin-right: 16px;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4dd0e1
}
</style>
