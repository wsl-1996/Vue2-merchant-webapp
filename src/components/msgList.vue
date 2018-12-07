<template>
  <div>
    <mu-paper>
      <mu-list textline="two-line" v-for="(item,i) in msgList" :key='i'>
        <div @click="gototalk(item.userId)">
          <mu-list-item>
            <mu-list-item-action>
              <mu-avatar>
                <img
                  :src='item.avatar'
                />
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title class="content">{{item.userName}}</mu-list-item-title>
              
              <mu-list-item-sub-title class="content">{{item.lastContent}}</mu-list-item-sub-title>
              <mu-list-item-sub-title class="content">{{item.sendTime}}</mu-list-item-sub-title>
            </mu-list-item-content>
        <mu-badge v-if="!item.isRead" content="news" color="secondary"></mu-badge>
          </mu-list-item>
        </div>
        <mu-divider></mu-divider>

      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgList: [
        {
          avatar: "static/avatar/3.png",
          userName: "用户123",
          sendTime: "Jan 17, 2018",
          lastContent:'我是机器人呀',
          userId: "00000000000000000000000000000001"
        },
        {
          avatar: "static/avatar/2.png",
          userName: "用户956",
          sendTime: "Jan 27, 2018",
          lastContent:'我是机器人哦',
          userId: "00000000000000000000000000000002"
        },
        {
          avatar: "static/avatar/1.png",
          userName: "用户U-N",
          sendTime: "Jan 07, 2018",
          lastContent:'我是机器人咯',
          userId: "00000000000000000000000000000003"
        }
      ]
    };
  },
  methods: {
    gototalk(userId) {
      console.log("click msg item");
      this.$router.push("/dialog/"+userId);
    },
    getMsgList(){
      var msgList = localStorage.getItem('msgList')
      msgList = JSON.parse(msgList)
      this.msgList = msgList
    }
  },
  mounted() {
    // localStorage.setItem("msgList",JSON.stringify(this.msgList))
    setInterval(this.getMsgList,1000)
  },
};
</script>
<style>
.content {
  margin-left: 30rpx;
}
</style>