<template>
  <div id="login">
    <div>
      <h3>领课教育系统 - 开源版</h3>
      <div>
        <i class="el-icon-user-solid"></i>
        <input type="text" v-model="user" placeholder="登录账号" />
      </div>
      <div>
        <i class="el-icon-s-goods"></i>
        <input type="text" v-model="pass" placeholder="登录密码" />
      </div>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
    <div>
      <img src="../assets/微信图片_20191128101905.png" alt />
    </div>
    <p>广州市领课网络科技有限公司 版权所有©2015-2019 | 粤ICP备16009964号</p>
  </div>
</template>

<script>
import { login } from "../api/login";
// 引入本地存储
import Local from "../components/local/local";
export default {
  data() {
    return {
      user: "13800000000",
      pass: "123456"
    };
  },
  methods: {
    async login() {
      let obj = {
        clientId: "lkb65617f842ad4c37895a733b8de43cbb",
        ip: "127.0.0.0",
        mobile: this.user,
        password: this.pass
      };
      let res = await login(obj);
      if (res.code == 200) {
        Local.save("userInfo", res.data);
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: "error"
        });
      }
      // 张钧已修改三次
      //刘涛已修改二次
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #93defe url(../assets/微信图片_20191128101900.png) no-repeat 200px
    150px;
  background-size: 560px 500px;
  > p {
    font-size: 16px;
    color: white;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 100px;
  }
  > div:nth-of-type(1) {
    height: 460px;
    width: 490px;
    background-color: #ffffff;
    border-radius: 6px;
    box-sizing: border-box;
    position: absolute;
    right: 300px;
    top: 170px;
    padding: 0 40px;
    > h3:nth-of-type(1) {
      font-size: 28px;
      color: #444;
      margin: 0 auto;
      text-align: center;
      font-weight: bold;
      margin-top: 80px;
    }
    > div:nth-of-type(1) {
      margin-top: 66px;
    }
    > div {
      width: 100%;
      height: 60px;
      border-radius: 6px;
      font-size: 14px;
      background: #e5e5e5;
      margin-top: 20px;
      display: flex;
      align-items: center;
      > i {
        color: #889aa4;
        font-size: 20px;
        margin-left: 15px;
      }
      > input {
        height: 30px;
        font-size: 14px;
        border: none;
        outline: none;
        background: #e5e5e5;
        margin-left: 20px;
      }
    }
    > button {
      width: 100%;
      height: 44px;
      margin-top: 26px;
    }
  }
  > div:nth-of-type(2) {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    right: 470px;
    top: 100px;
    > img {
      width: 60px;
      height: 60px;
      display: block;
      margin: 26px auto;
    }
  }
}
</style>
