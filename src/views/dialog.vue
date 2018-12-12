<template>
  <div id="div-content">
    <msgAppbar></msgAppbar>
    <mu-list textline='two-line' class="dialog-content" :style="{marginBottom:footerHeight}">
      <div
        v-for="(item,i) in msgStore"
        :key='i'
      >
        <mu-list-item v-if="item.isSelf">
          <mu-list-item-title class="msg-self-item">{{item.messageContent}}</mu-list-item-title>
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
          <mu-list-item-content>{{item.messageContent}}</mu-list-item-content>
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
        <mu-button icon>
          <mu-icon value="mic_none" />
        </mu-button>
        <mu-button icon>
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
      userId:this.$route.params.userId
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
          messageFrom: localStorage.getItem('merchantId'),
          messageTo:this.userId,
          messageType: "0",
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
</style>