<template>
  <div>
    <!-- <mu-paper> -->
    <div><span>hello</span>{{productId}}</div>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">主图</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <div class="img-container">
            <img class="detail-img" :src="productInfo.productFistImg">
            <!-- <mu-icon v-if="!editFlag" class="img-close" value="cancel" color="red"></mu-icon> -->
          </div>
          <input class="imginput" type="file" id="mainImgUpload" @change="changeContentImg($event,productInfo.productFistImg)">
          <mu-chip v-if="!editFlag" class="demo-chip" color="green">
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
          <mu-text-field v-else v-model="productInfo.productLabel[index]"></mu-text-field>
          <mu-chip v-if="!editFlag" class="demo-chip" color="green" @click="addlabel">
            添加标签
            <mu-icon value='add'></mu-icon>
          </mu-chip>
        </div>

      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
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
          <mu-chip v-if="!editFlag" class="demo-chip" color="green">
            <label for="slideImgUpload">
              上传图片
            </label>
            <mu-icon value='add'></mu-icon>
          </mu-chip>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">内容图片</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <div v-for="(item,index) in contentImgArr" :key="index" class="img-container">
            <img class="detail-img" :src="item">
            <mu-icon :id="index" @click="cancelImg($event,contentImgArr)" v-if="!editFlag" class="img-close" value="cancel" color="red"></mu-icon>
          </div>
          <input class="imginput" type="file" id="contentImgUpload" @change="changeContentImg($event,contentImgArr)">
          <mu-chip v-if="!editFlag" class="demo-chip" color="green">
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
          <mu-list v-if="editFlag" v-for="(item,i) in productInfo.productStyle" :key="i">
            <mu-list-item>
              <mu-list-item-title>{{productInfo.productStyle[i]}}</mu-list-item-title>
              <mu-list-item-title>{{productInfo.stylePrice[i]}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-list v-else>
            <mu-list-item>
              <mu-text-field help-text="款式" v-model="productInfo.productStyle[i]"></mu-text-field>
              <mu-text-field help-text="价格" v-model="productInfo.stylePrice[i]"></mu-text-field>
            </mu-list-item>
          </mu-list>
        </div>
        <mu-chip v-if="!editFlag" class="demo-chip" color="green" @click="addStyle">
          添加样式
          <mu-icon value='add'></mu-icon>
        </mu-chip>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">商品默认价格</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.price}}</span>
          <mu-text-field v-else v-model="productInfo.price"></mu-text-field>
        </div>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">商品类型</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productTypeText[productInfo.productType]}}</span>
          <mu-flex v-else class="select-control-row" :key="i" v-for="i in 4">
            <mu-radio :value="i-1" v-model="productInfo.productType" :label="productTypeText[i-1]" @change="typeChange"></mu-radio>
          </mu-flex>
        </div>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">商品参数</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <mu-list v-if="editFlag" v-for="(item,i) in productInfo.parameter" :key="i">
            <mu-list-item>
              <mu-list-item-title>{{i}}</mu-list-item-title>
              <mu-list-item-title>{{productInfo.parameter[i]}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
          <mu-list v-else>
            <mu-list-item>
              <mu-text-field v-model="i"></mu-text-field>
              <mu-text-field v-model="productInfo.parameter[i]"></mu-text-field>
            </mu-list-item>
          </mu-list>
        </div>
        <mu-chip v-if="!editFlag" class="demo-chip" color="green" @click="addParameter">
          添加样式
          <mu-icon value='add'></mu-icon>
        </mu-chip>
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
      <mu-col span="3">
        <div class="content">开始事件</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.onlineTime}}</span>
          <mu-date-picker v-else :date.sync='productInfo.onlineTime'></mu-date-picker>
        </div>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="3">
        <div class="content">截止时间</div>
      </mu-col>
      <mu-col span="9">
        <div class="content">
          <span v-if="editFlag">{{productInfo.offlineTime}}</span>
          <mu-date-picker v-else :date.sync='productInfo.offlineTime'></mu-date-picker>
        </div>
      </mu-col>
    </mu-row>

    <mu-row class="row-container" gutter>
      <mu-col span="4" offset="4">
        <div>
          <mu-button color="primary" @click="gotoedit">{{btnText}}</mu-button>
          <mu-button v-if="editFlag&&firstTime" color="success" @click="gotocommit">{{commitText()}}</mu-button>
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
  props: ["productId"],
  data() {
    return {
      normal: {
        message: "Hello !",
        open: false,
        timeout: 3000
      },
      editFlag: true,
      productInfo: "",
      sildeImgArr: [],
      contentImgArr: [],
      btnText: "编辑",
      firstTime: false,
      commitText() {
        if (this.productId == -1) {
          return "创建";
        } else {
          return "完成修改";
        }
      },
      productTypeText:['全新','闲置','虚拟物品','服务']
    };
  },
  mounted() {
    console.log("props pid", this.productId);
    this.getDetail();
  },
  methods: {
    gotoedit() {
      this.editFlag = !this.editFlag;
      if (this.editFlag == true) {
        this.btnText = "编辑";
        this.firstTime = true;
      } else {
        this.btnText = "预览";
      }
    },
    getDetail() {
      if (this.productId == -1) {
        this.productInfo = {
          productType: 0,
          productName: "",
          productInfo: "",
          price: "",
          stockCount: "",
          productClassifyCode: "",
          merchantId: localStorage.getItem('merchantId'),
          packStand: "",
          afterSale: "",
          productLabel: "",
          productFistImg: "/static/picture.png",
          productSlideImg: "",
          productContentImg: "",
          productState: 1,
          onlineTime: new Date(),
          offlineTime: new Date(),
          saleVolumeHistory: 0,
          saleVolumeMonthly: 0,
          productStyle: "",
          stylePrice: "",
          returnCashRate: 0.0,
          returnCashRateLinksender: 0.0
        };
        this.sildeImgArr = [];
        this.contentImgArr = [];
        this.productInfo.productLabel = [];
        this.productInfo.productStyle = [];
        this.productInfo.stylePrice = [];
        this.editFlag = false;
      } else {
        this.axios
          .get(
            this.GLOBAL.webappServerSrc+"/WebAppService/products/getgoodsdetail",
            {
              params: {
                productid: this.productId
              }
            }
          )
          // this.axios.get("/static/mock/goodsdetail.json")
          .then(response => {
            console.log("props pid", this.productId);
            this.productInfo = response.data.data.product;
            console.log("pruduct_data", this.productInfo);
            this.productInfo.parameter = JSON.parse(
              this.productInfo.productInfo
            );
            this.sildeImgArr = JSON.parse(this.productInfo.productSlideImg);
            this.contentImgArr = JSON.parse(this.productInfo.productContentImg);
            this.productInfo.productLabel = JSON.parse(
              this.productInfo.productLabel
            );
            this.productInfo.productStyle = JSON.parse(
              this.productInfo.productStyle
            );
            this.productInfo.stylePrice = JSON.parse(
              this.productInfo.stylePrice
            );
            this.productInfo.onlineTime = new Date(this.productInfo.onlineTime);
            console.log(
              "this.productInfo.parameter",
              this.productInfo.parameter
            );
            this.productInfo.offlineTime = new Date(
              this.productInfo.offlineTime
            );
            // this.productInfo.afterSale=JSON.parse(this.productInfo.afterSale)
            // console.log(this.productInfo.afterSale)
          });
      }
    },
    gotocommit() {
      var commitUrl = ""
      if(this.productId == -1){
        commitUrl = this.GLOBAL.webappServerSrc+ "/WebAppService/products/addproduct"
      }else{
        commitUrl = this.GLOBAL.webappServerSrc+ "/WebAppService/products/modifyproduct"
      }
      var postGoodsDetail = {};
      postGoodsDetail = this.productInfo;
      postGoodsDetail.productSlideImg = JSON.stringify(this.sildeImgArr);
      postGoodsDetail.productContentImg = JSON.stringify(this.contentImgArr);
      console.log("post-detail", postGoodsDetail);

      this.axios
        .post(commitUrl, {
          params: {
            productId:this.productId,
            productName: postGoodsDetail.productName,
            productInfo: postGoodsDetail.parameter,
            price: postGoodsDetail.price,
            stockCount: postGoodsDetail.stockCount,
            merchantId: postGoodsDetail.merchantId,
            afterSale: JSON.stringify(postGoodsDetail.afterSale),
            productLabel: JSON.stringify(postGoodsDetail.productLabel),
            productFistImg: postGoodsDetail.productFistImg,
            productSlideImg: postGoodsDetail.productSlideImg,
            productContentImg: postGoodsDetail.productContentImg,
            onlineTime: postGoodsDetail.onlineTime.getTime(),
            offlineTime: postGoodsDetail.offlineTime.getTime(),
            productStyle: JSON.stringify(postGoodsDetail.productStyle),
            returnCashRate: postGoodsDetail.returnCashRate,
            returnCashRateLinksender: postGoodsDetail.returnCashRateLinksender,
            packStand: postGoodsDetail.packStand,
            stylePrice: JSON.stringify(postGoodsDetail.stylePrice),
            productClassifyCode: '001100',
            carriagePrice: 10,
            productType:postGoodsDetail.productType
          }
        })
        .then(response => {
          console.log("post axios");
        });
    },
    cancelImg(e, tempArr) {
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
    addlabel() {
      if (this.productInfo.productLabel.length > 5) {
        this.normal.message = "不能拥有更多标签了";
        this.openNormalSnackbar();
      } else {
        this.productInfo.productLabel.push("");
      }
    },
    addStyle() {
      if (this.productInfo.productStyle.length > 5) {
        this.normal.message = "不能拥有更多样式了";
        this.openNormalSnackbar();
      } else {
        this.productInfo.productStyle.push("");
      }
    },
    addParameter() {
      if (this.productInfo.parameter.length > 5) {
        this.normal.message = "不能拥有更多参数了";
        this.openNormalSnackbar();
      } else {
        var key = "a";
        var value = "b";
        this.productInfo.parameter[key] = value;
        console.log(this.productInfo.parameter);
      }
    },
    typeChange(){
      console.log(this.productInfo.productType)
    },
    openNormalSnackbar() {
      console.log("zhixingle ");
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
.row-container {
  margin: 30px;
}
</style>
