<template>
  <div>
    <p>欢迎登录</p>
    <input type="text" name="phone" v-model="phone" placeholder="请输入手机号">
    <input type="password" name="password" v-model="password" placeholder="请输入密码">
    <button @click="Login">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    Login: async function () {
      let res = await this.$store.dispatch('getLogin', { phone: this.phone, password: this.password })

      if (res.data.code == 200) {
        this.$store.commit('updateIsLogin', true)
        this.$store.commit('updateToken', res.data.token)
        this.$router.push('/infoUser')

      }
      else {
        alert('手机号码或者密码错误')
        this.password = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
div {
  width: 300px;
  height: 300px;
  background-color: cornflowerblue;
  display: flex;
  margin-top: 100px;
  margin-left: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  p {
    font-size: 30px;
    color: white;
  }

  input {
    height: 40px;
  }

  button {
    width: 80px;
  }
}
</style>
