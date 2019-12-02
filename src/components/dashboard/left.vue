<template>
  <div class="left">
    <el-menu
      :class="
        this.$store.state.msg == ''
          ? 'el-menu-vertical-demo '
          : 'el-menu-vertical-demo sion'
      "
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      style="overflow: hidden"
      background-color="#304156"
      text-color="#BFCBD9"
      :collapse="this.$store.state.msg == ''"
    >
      <template v-for="(item, index) in leftMenu">
        <el-submenu
          :key="index"
          v-if="item.name != '首页'"
          :index="String(index + 1)"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <template v-for="(item2, index2) in item.children">
            <el-submenu
              :key="index2"
              @click="push(item2, index2)"
              v-if="item2.children.length > 0"
              :index="String(index + 1) + '-' + String(index2 + 1)"
            >
              <span slot="title">{{ item2.name }}</span>
              <el-menu-item
                :key="index3"
                v-for="(item3, index3) in item2.children"
                @click="push(item3, index3)"
                :index="
                  String(index + 1) +
                    '-' +
                    String(index2 + 1) +
                    '-' +
                    String(index3 + 1)
                "
                >{{ item3.name }}</el-menu-item
              >
            </el-submenu>
          </template>
          <template v-for="(item2, index2) in item.children">
            <el-menu-item
              @click="push(item2, index2)"
              :key="index2"
              v-if="item2.children.length <= 0"
              :index="String(index + 1) + '-' + String(index2 + 1)"
              >{{ item2.name }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { LeftMenu } from "../../api/dashboard";

export default {
  created() {
    // 调用渲染菜单方法
    this.getLeftMenu();
  },
  data() {
    return {
      // 菜单数组
      leftMenu: [],
      sum: -1
    };
  },
  methods: {
    // 渲染菜单
    async getLeftMenu() {
      let obj = {};
      let res = await LeftMenu(obj);
      this.leftMenu = res.data.sysMenu;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose() {
      // console.log(key, keyPath);
    },
    //
    push(item3, index3) {
      console.log(item3, index3);
      let obj = {
        name: item3.name,
        path: item3.path,
        state: true
      };
      this.$store.commit("tag", obj);
      this.$router.push({
        path: item3.path
      });
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
  background: #304156;
}
.el-menu-vertical-demo {
  background: #304156;
  transition: all 0s;
}
.sion {
  transition: all 0.4s;
}
.el-menu {
  border: none;
}
.el-menu-item {
  width: 180px;
}
</style>
