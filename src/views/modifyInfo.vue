<template>
  <div class="div-container">
    <v-appbar
      iconvalue='keyboard_arrow_left'
      barTitle='修改信息'
    ></v-appbar>
    <mu-row>
      <mu-col span='3'>修改头像</mu-col>
      <mu-col span='9'>
        <img class="detail-img" :src="modifiedImg">
        <input class="imginput" type="file" id="mainImgUpload" @change="changeContentImg($event,modifiedImg)">
          <mu-chip class="demo-chip chip-sty" color="#80deea">
            <label for="mainImgUpload">
              上传头像
            </label>
          </mu-chip>
      </mu-col>
    </mu-row>
    <mu-row>
      <mu-col span='3'>商家名称</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="name"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>地址</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="address"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>简要描述</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="discription"></mu-text-field>
      </mu-col>
    </mu-row>

    <mu-row>
      <mu-col span='3'>邮箱</mu-col>
      <mu-col span='9'>
        <mu-text-field v-model="email"></mu-text-field>
      </mu-col>
    </mu-row>



    <mu-row>
      <mu-col offset='8'>
        <mu-button
          color="#4dd0e1"
          @click="commitReg"
        >提交</mu-button>
      </mu-col>
    </mu-row>
  </div>
</template>
<script>
import appbar from "@/common/_appbar";
import common from "@/util/common.js";
import * as qiniu from "qiniu-js";
export default {
  components: {
    "v-appbar": appbar
  },
  data() {
    return {
      name: "",
      address: "",
      discription: "",
      email: "",
      modifiedImg:''
    };
  },
  methods: {
    commitReg() {
      this.axios.post(this.GLOBAL.webappServerSrc + "/WebAppService/my/setmyinfo",{
        params:{
          merchantid:localStorage.getItem('merchantId'),
          name:this.name,
          address:this.address,
          discription:this.discription,
          email:this.email,
          headimg:this.modifiedImg,
        }
      },{
        headers:{
          sessionid: localStorage.getItem("sessionId")
        }
      }).then( res=>{
        if(res.data.failed){
          this.$alert('修改失败，请重试')
        }else{
          this.$alert('修改成功')
          this.getUserInfo()
        }
      })
    },
    getUserInfo() {
      this.axios
        .get(this.GLOBAL.webappServerSrc + "/WebAppService/my/getmyinfo", {
          params: {
            merchantid: localStorage.getItem("merchantId"),
            page: "0"
          },
          headers: {
            sessionid: localStorage.getItem("sessionId")
          }
        })
        .then(res => {
          console.log("getMyInfo res", res.data);
          var merchantInfo = res.data.data.merchant;
          this.name = merchantInfo.name
          this.address = merchantInfo.address
          this.discription = merchantInfo.discription
          this.email = merchantInfo.email
          this.modifiedImg = merchantInfo.headImg
        });
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
      var key = "header_" + common.randomString(12);
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
            this.modifiedImg = imgUrlNow;
          
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
  },
  mounted() {
    this.getUserInfo()
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}

.detail-img {
  width: 100px;
  height: 100px;
}
.imginput {
  display: none;
}

</style>