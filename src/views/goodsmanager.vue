<template>
    <mu-container>
  <mu-paper :z-depth="1">
    <mu-data-table :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list">
      <template slot-scope="scope">
        <td  @click="gotoDetail"><img :src="scope.row.img" class="img-content"/></td>
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
      list: [
        {
          img:
            "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png",
          name: "alpha蛋智能语音机器人",
          price:'123',
          type:'上线中',
          onlineTime:'2018/7/8'
        },
        {
          img:
            "http://47.99.78.252:8080/ketuan/imagesDir/0183bd3adf244ea7954d2c50cdb83fa9.png",
          name: "alpha蛋智能语音机器人",
          price:'124',
          type:'上线中',
          onlineTime:'2018/7/8'
        },
        {
          img:
            "http://47.99.78.252:8080/ketuan/imagesDir/6f5e76dce64941ffb6a7f8beb2ce93f5.png",
          name: "alpha蛋智能语音机器人",
          price:'1256',
          type:'上线中',
          onlineTime:'2018/7/8'
        },
        {
          img:
            "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png",
          name: "alpha蛋智能语音机器人",
          price:'127',
          type:'上线中',
          onlineTime:'2018/7/8'
        },
        {
          img:
            "http://47.99.78.252:8080/ketuan/imagesDir/36c8afde4fcf421f8f062b457ed58fb1.png",
          name: "alpha蛋智能语音机器人",
          price:'127',
          type:'上线中',
          onlineTime:'2018/7/8'
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
    gotoDetail(){
        this.$router.push('goodsDetail')
    }
  }
};
</script>
<style>
 .img-content{
     width: 100px;
     height: 100px;
 }
</style>
