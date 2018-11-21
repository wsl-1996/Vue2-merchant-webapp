<template>
    <div>
        <h1>register</h1>
        <mu-container>
  <mu-form ref="form" :model="validateForm" class="mu-demo-form">
    <mu-form-item label="手机号" help-text="帮助文字" prop="username" :rules="usernameRules">
      <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
    </mu-form-item>
    <mu-form-item label="验证码" prop="password" :rules="passwordRules">
        <mu-text-field  v-model="validateForm.password" prop="password"></mu-text-field>
         <mu-button>获取验证码</mu-button>
    </mu-form-item>

    <mu-form-item>
      <mu-button color="primary" @click="register">注册</mu-button>
    </mu-form-item>
  </mu-form>
</mu-container>
    </div>
</template>
<script>
export default {
  data() {
    return {
      usernameRules: [
        { validate: val => !!val, message: "必须填写手机号" },
        { validate: val => val.length = 11, message: "手机号长度为11位" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写验证码" },

      ],
      validateForm: {
        username: "",
        password: "",
      }
    };
  },
  methods: {
    register() {
        this.$router.push('/')
    },
  }
};
</script>
<style>
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>