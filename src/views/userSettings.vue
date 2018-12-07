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
            <mu-icon value="account_box"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>设置与修改用户名密码</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>

      <div @click="setUsername">
        <mu-expansion-panel>
          <div slot="header">
                <mu-icon value="account_box"></mu-icon>
                <span>设置用户名密码</span>
          </div>
          <v-modifyuser></v-modifyuser>
        </mu-expansion-panel>
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
    "v-modifyuser": modifyuser
  },
  data() {
    return {};
  },
  methods: {
    logOff() {
      this.$confirm('确定退出登录么', '提示', {
        type: 'warning'
      }).then(({ result }) => {
        if (result) {
          localStorage.removeItem("sessionId");
          this.$router.push("/");
        } else {
          this.$toast.message('点击了取消');
        }
      });

    },
    setUsername() {
      console.log("axxxxxxxa");
    }
  }
};
</script>
<style>
</style>