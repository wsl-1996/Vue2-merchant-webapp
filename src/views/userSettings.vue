<template>
  <div>
    <v-appbar
      iconvalue='home'
      barTitle='设置'
    ></v-appbar>
    <mu-list>
      <div @click="logOff">
        <mu-list-item>
          <mu-list-item-action>
            <mu-icon value="power_settings_new"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>

      <div @click="setUsername">
        <mu-list-item>
          <mu-list-item-action>
            <mu-icon value="account_circle"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>设置与修改用户名密码</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>

      <div @click="setUserInfo">
        <mu-list-item>
          <mu-list-item-action>
            <mu-icon value="description"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>设置与修改商户信息</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>

      <div @click="removemsgList">
        <mu-list-item>
          <mu-list-item-action>
            <mu-icon value="delete"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>清空消息列表</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
  </div>

</template>

<script>
import appbar from "@/common/_appbar";
export default {
  components: {
    "v-appbar": appbar
  },
  data() {
    return {};
  },
  methods: {
    logOff() {
      this.$confirm("确定退出登录么", "提示").then(({ result }) => {
        if (result) {
          localStorage.removeItem("sessionId");
          this.$router.push("/");
        } else {
          this.$toast.message("点击了取消");
        }
      })
    },
    setUsername() {
      this.$router.push("/modifyUser");
    },
    setUserInfo(){
      this.$router.push("/modifyInfo");
    },
    removemsgList(){
      this.$confirm('确定清空消息列表么','提示').then(({result})=>{
        if (result) {
          localStorage.removeItem('msgList')
          this.$router.push("/");
        } else {
          this.$toast.message("点击了取消");
        }
      })
    }
  }
};
</script>
<style>
</style>