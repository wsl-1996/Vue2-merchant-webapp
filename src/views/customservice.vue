<template>
    <div>
        <msgList></msgList>
    </div>
</template>

<script>
import msgAppbar from '@/common/msgAppbar.vue'
import msgList from '@/components/msgList.vue'
export default{
    components:{
        msgAppbar,
        msgList
    },
    methods:{
    getMyInfo() {
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
          this.merchantInfo = res.data.data.merchant;
          localStorage.setItem('myAvatar',this.merchantInfo.headImg)
        });
    },
    },
    mounted() {
        this.getMyInfo()
    },
}
</script>