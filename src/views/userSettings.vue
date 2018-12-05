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
        <mu-expansion-panel>
          <div slot="header">
            <mu-icon value="account_box"></mu-icon>
            设置用户名密码
       </div>
         <v-modifyuser></v-modifyuser>
        </mu-expansion-panel>
        <mu-divider></mu-divider>
      </div>

    </mu-list>
  </div>
</template>

<script>
import appbar from "@/common/_appbar";
import modifyuser from "@/components/modifyUser";
export default {
  components: {
    "v-appbar": appbar,
    "v-modifyuser":modifyuser
  },
  data() {
    return {};
  },
  methods: {
    logOff() {
      localStorage.removeItem("sessionId");
      this.$router.push("/");
    },
    setUsername() {
      console.log("axxxxxxxa");
      
    }
  }
};
</script>
<style>
</style>