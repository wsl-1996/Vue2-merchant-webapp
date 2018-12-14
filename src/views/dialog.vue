<template>
  <div id="div-content">
    <msgAppbar></msgAppbar>
    <mu-list textline='three-line' class="dialog-content" :style="{marginBottom:footerHeight}">
      <div
        v-for="(item,i) in msgStore"
        :key='i'
      >
        <mu-list-item v-if="item.isSelf">
          <mu-list-item-title v-if="item.contentType==0" class="msg-self-item">{{item.messageContent}}</mu-list-item-title>
          <mu-list-item-content><img v-if="item.contentType==1" class="msgImg right" :src="item.messageContent" ></mu-list-item-content>
          <mu-list-item-action>
            <mu-avatar>
              <img :src="item.headOwner">
            </mu-avatar>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item v-else>
          
          <mu-list-item-action>
            <mu-avatar>
              <img :src="item.headOwner">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content v-if="item.contentType==0">{{item.messageContent}}</mu-list-item-content>
          <img v-if="item.contentType==1" class="msgImg" :src="item.messageContent" >
        </mu-list-item>
      </div>
    </mu-list>
    <div
      class="bottomfixed"
      ref="footer"
    >
      <div class="top">
        <mu-text-field
          hintText="输入文字"
          v-model="value"
          @focus="focus"
          @blur="blur"
          @keyup.enter.native="sendValue"
        />

        <mu-button
          icon
          @click="sendValue"
        >
          <mu-icon value="send" />
        </mu-button>
      </div>
      <div class="bottom">
        <input type="file" ref="file" @change="changeMsgImg($event)" style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;">
        <mu-button icon>
          <mu-icon value="mic_none" />
        </mu-button>
        <mu-button icon @click="clickImg">
          <mu-icon value="photo_size_select_actual" />
        </mu-button>
        <mu-button icon>
          <mu-icon value="tag_faces" />
        </mu-button>
        <mu-button icon>
          <mu-icon value="photo_camera" />
        </mu-button>
        <mu-button icon>
          <mu-icon value="folder_open" />
        </mu-button>
      </div>
    </div>
  </div>

</template>

<script>
import common from "@/util/common.js";
import * as qiniu from "qiniu-js";
import utils from "@/util/utils.js";
import msgAppbar from "@/common/msgAppbar.vue";
export default {
  components: {
    msgAppbar
  },
  data() {
    return {
      footerHeight: '',
      value: "",
      msgStore: [],
      msgStoreString:'',
      userId:this.$route.params.userId,
      msgImgNow:''
    };
  },
  watch:{
    msgStoreString:function(newvalue,oldvalue){
      scroll(0,document.body.scrollHeight)
      console.log('msgStore变化了',document.body.scrollHeight)
    }
  },
  methods: {
    focus() {},
    blur() {},
    sendValue() {
      scroll(0,document.body.scrollHeight)
      console.log("this.value.length", this.value.length);
      if (this.value.length) {
        var tempMsg={
          headOwner: localStorage.getItem('myAvatar'),
          isSelf: true,
          contentType: "0",
          direction: "0",
          messageContent: this.value,
          userNick:localStorage.getItem('myNick'),
          messageFrom: localStorage.getItem('merchantId'),
          messageTo:this.userId,
          messageType: "0",
          contentType:'0'
        }
        this.msgStore.push(tempMsg);
        localStorage.setItem('msgStore'+this.userId, JSON.stringify(this.msgStore))

        this.axios.get(this.GLOBAL.commonServerSrc+'/CommonService/Messages/sendMessage',{
          params:{
            data : JSON.stringify(tempMsg)
          }
        ,
          headers:{
            sessionid:localStorage.getItem('sessionId')
          }
        }).then( res=>{
          if(res.data.failed){
            console.log('send failed')
          }else{
            console.log('send success')
          }
        })

      } else {
        console.log("不能为空");
      }
      this.value = "";
    },
    getMsgHistory(){
      if(localStorage.getItem('msgStore'+this.userId)==null){
          this.msgStore=this.msgStore
      }else{
        this.msgStore = JSON.parse(localStorage.getItem('msgStore'+this.userId))  
        this.msgStoreString = localStorage.getItem('msgStore'+this.userId) 
      }
    },
    setIsRead(){
      var msgList = JSON.parse(localStorage.getItem('msgList'))
      for(var item of msgList){
        if(item.userId == this.userId){
          item.isRead = true
        }
      }
      localStorage.setItem('msgList',JSON.stringify(msgList))
    },
    clickImg(){
      this.$refs.file.click()
      
    },
    async changeMsgImg(evt) {
      console.log("evt", evt);
      var tempImg = [];
      let file = evt.target.files[0];
      let fileName = file.name;
      console.log(file);
      let dataURL = await this.getDataURL(file);
      //this.headImg = { name: fileName, src: dataURL };
      var key = "msg_" + common.randomString(12);
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
  
            this.msgImgNow = imgUrlNow;
            this.sendImg(this.msgImgNow)
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
        .get(this.GLOBAL.commonServerSrc+"/CommonService/QiNiuYun/getUploadToken", {
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
    sendImg(msgimg){
          var tempMsg={
          headOwner: localStorage.getItem('myAvatar'),
          isSelf: true,
          contentType: "0",
          direction: "0",
          messageContent: msgimg ,
          messageFrom: localStorage.getItem('merchantId'),
          messageTo:this.userId,
          messageType: "0",
          contentType:'1'
        }
        this.msgStore.push(tempMsg);
        localStorage.setItem('msgStore'+this.userId, JSON.stringify(this.msgStore))

        this.axios.get(this.GLOBAL.commonServerSrc+'/CommonService/Messages/sendMessage',{
          params:{
            data : JSON.stringify(tempMsg)
          }
        ,
          headers:{
            sessionid:localStorage.getItem('sessionId')
          }
        }).then( res=>{
          if(res.data.failed){
            console.log('send failed')
          }else{
            console.log('send success')
          }
        })
    }
  },
  mounted() {
      this.getMsgHistory()
      setInterval(this.getMsgHistory,1000)
      this.setIsRead()
      this.footerHeight = this.$refs.footer.offsetHeight+'px'
      

      this.$nextTick(function(){
        scroll(0,document.body.scrollHeight)
      })
     
  },
  created() {
    console.log('created执行')
  },
};
</script>
<style scoped>
.bottomfixed {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background: #fff;
}

.msg-self-item {
  text-align: right;
}

.top , .bottom{
  background-color: #fff;
}
.msgImg{
  max-width: 250px;
  height: 90px;
}
.right{
  float: right;
}
</style>