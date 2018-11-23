<template>
  <div>
    <!-- <mu-paper> -->
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">主图</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <div class="img-container">
            <img class="detail-img" :src="productInfo.productFistImg">
            <mu-icon v-if="!editFlag" class="img-close" value="cancel" color="red"></mu-icon>
          </div>
          <input class="imginput" type="file" id="mainImgUpload" @change="changeContentImg($event,productInfo.productFistImg)">
          <mu-chip v-if="!editFlag" class="demo-chip" color="green"  >
            <label for="mainImgUpload">
            上传图片
          </label>
          <mu-icon value='add'></mu-icon>
          </mu-chip>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">名称</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.productName}}</span>
          <mu-text-field v-else v-model="productInfo.productName"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">包装规格</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.packStand}}</span>
          <mu-text-field multi-line :rows="3" :rows-max="6" v-else v-model="productInfo.packStand"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">售后服务</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.afterSale}}</span>
          <mu-text-field multi-line :rows="3" :rows-max="10" v-else v-model="productInfo.afterSale"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">商品标签</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag" v-for="(item,index) in productInfo.productLabel" :key="index">{{item}}</span>
          <mu-text-field  v-else v-model="item"></mu-text-field>
           <mu-chip v-if="!editFlag" class="demo-chip" color="green"  @click="addlabel">
          添加标签
          <mu-icon value='add'></mu-icon>
          </mu-chip>
        </div>
       
      </mu-col>
    </mu-row>
    <mu-row  class="row-container" gutter>
      <mu-col span="3">
        <div class="content">滑动图片</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <div v-for="(item,index) in sildeImgArr" :key="index" class="img-container">
            <img class="detail-img" :src="item">
            <mu-icon :id="index" @click="cancelImg($event,sildeImgArr)" v-if="!editFlag" class="img-close" value="cancel" color="red"></mu-icon>
          </div>
          <input class="imginput" type="file" id="slideImgUpload" @change="changeContentImg($event,sildeImgArr)">
         <mu-chip v-if="!editFlag" class="demo-chip" color="green"  >
            <label for="slideImgUpload">
            上传图片
          </label>
          <mu-icon value='add'></mu-icon>
          </mu-chip>
        </div>
      </mu-col>
    </mu-row>
    <mu-row  class="row-container" gutter>
      <mu-col span="3">
        <div class="content">内容图片</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <div v-for="(item,index) in contentImgArr" :key="index" class="img-container">
            <img class="detail-img" :src="item">
            <mu-icon :id="index" @click="cancelImg($event,contentImgArr)" v-if="!editFlag" class="img-close" value="cancel" color="red"></mu-icon>
          </div>
          <input  class="imginput" type="file" id="contentImgUpload" @change="changeContentImg($event,contentImgArr)">
          <mu-chip v-if="!editFlag" class="demo-chip" color="green"  >
            <label for="contentImgUpload">
            上传图片
          </label>
          <mu-icon value='add'></mu-icon>
          </mu-chip>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">商品样式</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag" v-for="(item,i) in productInfo.productStyle" :key="i">{{item}}</span>
          <mu-text-field v-else v-model="productInfo.productStyle[i]"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">库存量</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.stockCount}}</span>
          <mu-text-field v-else v-model="productInfo.stockCount"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>

      <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">直接返现</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.returnCashRate}}</span>
          <mu-text-field v-else v-model="productInfo.returnCashRate" label-float help-text="返现比例应该小于百分之五"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>

        <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">分享者返现</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.returnCashRateLinksender}}</span>
          <mu-text-field v-else v-model="productInfo.returnCashRateLinksender" label-float help-text="返现比例应该小于百分之五"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="4" offset="4">
        <div>
          <mu-button color="primary" @click="gotoedit">{{btnText}}</mu-button>
          <mu-button v-if="editFlag&&firstTime" color="success" @click="gotocommit">提交修改</mu-button>
        </div>
      </mu-col>
    </mu-row>
    <mu-snackbar position="top-end" :open.sync="normal.open">
    {{normal.message}}
    <mu-button flat slot="action" color="secondary" @click="normal.open = false">Close</mu-button>
    </mu-snackbar>
    <!-- </mu-paper> -->
  </div>
</template>

<script>
import common from "@/util/common.js";
import * as qiniu from "qiniu-js";
export default {
  props:{
    // productId:productId
  },
  data() {
    return {
      normal:{
        message: 'Hello !',
        open: false,
        timeout: 3000
      },
      editFlag: true,
      productInfo: "",
      sildeImgArr: [],
      contentImgArr: [],
      btnText: "编辑",
      firstTime: false,
      productId:''
    };
  },
  mounted() {
    console.log('props pid',this.productId)
    this.getDetail();
  },
  methods: {
    gotoedit() {
      this.editFlag = !this.editFlag;
      if (this.editFlag == true) {
        this.btnText = "编辑";
        this.firstTime = true;
      } else {
        this.btnText = "完成";
      }
    },
    getDetail() {
      this.axios.get("/static/mock/goodsdetail.json").then(response => {
        this.productInfo = response.data.data.product;
        console.log("pruduct_data", this.productInfo);
        this.sildeImgArr = JSON.parse(this.productInfo.productSlideImg);
        this.contentImgArr = JSON.parse(this.productInfo.productContentImg);
        this.productInfo.productLabel=JSON.parse(this.productInfo.productLabel)
        this.productInfo.productStyle=JSON.parse(this.productInfo.productStyle)
        // this.productInfo.afterSale=JSON.parse(this.productInfo.afterSale)
        // console.log(this.productInfo.afterSale)
      });
    },
    gotocommit() {
      var postGoodsDetail={}
      postGoodsDetail = this.productInfo
      postGoodsDetail.productSlideImg= JSON.stringify(this.sildeImgArr)
      postGoodsDetail.productContentImg= JSON.stringify(this.contentImgArr)
      console.log('post-detail',postGoodsDetail)

    },
    cancelImg(e,tempArr) {
      var delindex = e.target.id;
      console.log("delindex", e.target.id);
      tempArr.splice(delindex, 1);
    },
    async changeContentImg(evt, imgArr) {
      console.log("evt", evt);
      console.log("imgArr", imgArr);
      var tempImg = [];
      let file = evt.target.files[0];
      let fileName = file.name;
      console.log(file);
      let dataURL = await this.getDataURL(file);
      //this.headImg = { name: fileName, src: dataURL };
      var key = "product_" + common.randomString(12);
      tempImg.push({ name: fileName, src: dataURL, imgkey: key });
      console.log("tempImg", tempImg);
      var observer = {
        next: res => {
          console.log(res);
        },
        error: err => {
          console.log(err);
        },
        complete: res => {
          console.log("completeres", res);
          var qiniukey = res.key;
          var imgUrlNow;
          imgUrlNow = "http://resource.skqtec.com/" + qiniukey;

          console.log(imgUrlNow);
          if (typeof imgArr == "object") {
            imgArr.push(imgUrlNow);
          } else {
            this.productInfo.productFistImg = imgUrlNow;
          }
        }
      };
      this.uploader(file, observer, key);
    },
    getDataURL(file) {
      return new Promise((res, rej) => {
        let reader = new FileReader();
        reader.readAsDataURL(file); // 这是个异步操作
        reader.onload = evt => res(evt.target.result); //读取完毕后 执行 这个匿名函数
        reader.onerror = err => rej(err);
      });
    },
    uploader(data, observer, key) {
      console.log(data);
      this.axios
        .get("http://47.99.78.252:8080/CommonService/QiNiuYun/getUploadToken", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
          },
          params: {
            fileKey: key
          }
        })
        .then(response => {
          console.log(response);
          var token = response["data"]["data"]["upToken"];
          var config = {
            useCdnDomain: true,
            disableStatisticsReport: false,
            retryCount: 6,
            region: qiniu.region.z0
          };
          var putExtra = {
            fname: data.name,
            params: {},
            mimeType: null
          };

          var observable = qiniu.upload(data, key, token, putExtra, config);
          var subscription = observable.subscribe(observer);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addlabel(){
      if(this.productInfo.productLabel.length>5){
        this.normal.message='不能拥有更多标签了'
        this.openNormalSnackbar()
      }else{
        this.productInfo.productLabel.push('')
      }
    } ,
  openNormalSnackbar () {
      console.log('zhixingle ')
      if (this.normal.timer) clearTimeout(this.normal.timer);
      this.normal.open = true;
      this.normal.timer = setTimeout(() => {
        this.normal.open = false;
      }, this.normal.timeout);
    }
  } 
};
</script>

<style>
@import "http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css";
.detail-img {
  width: 100px;
  height: 100px;
}
.content {
  /* border: 1px solid #ccc; */
}
.img-container {
  position: relative;
  display: inline-block;
  margin: 10px;
}
.img-close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.imginput {
  display: none;
}
.row-container{
  margin: 30px
}
</style>
