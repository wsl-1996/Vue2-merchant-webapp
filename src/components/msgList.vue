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
              <mu-list-item-sub-title class="content">{{item.sendTime}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <span>time</span>
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
          userName: "用户0000",
          sendTime: "Jan 17, 2018",
          userId: "00000000000000000000000000000000"
        },
        {
          avatar: "static/avatar/2.png",
          userName: "用户0000",
          sendTime: "Jan 27, 2018",
          userId: "asd00o"
        },
        {
          avatar: "static/avatar/1.png",
          userName: "用户U-N",
          sendTime: "Jan 07, 2018",
          userId: "03bc2e3fac184bf1969b3890df492c5f"
        }
      ]
    };
  },
  methods: {
    gototalk(userId) {
      console.log("click msg item");
      this.$router.push("/dialog/"+userId);
    }
  }
};
</script>
<style>
.content {
  margin-left: 30rpx;
}
</style>