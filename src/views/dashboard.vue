<template>
  <div id="dashboard">
    <div :class="this.$store.state.msg == '' ? 'narrow' : 'width'">
      <Left></Left>
    </div>
    <div :class="this.$store.state.msg == '' ? 'duan' : 'chang'">
      <div class="top_top">
        <i ref="i" @click="toggle" class="el-icon-sort"></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/dashboard' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>
            <a href>活动管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <img @click="image_toggle" src="../assets/tuzi.gif" alt />
      </div>
      <div class="top_bottom">
        <el-tag
          v-for="(item, index) in this.$store.state.tag"
          :key="index"
          closable
          :color="item.state ? '#42B983' : 'white'"
          @click="tag_path(item, index)"
          @close="tag_close(item, index)"
          :class="item.state ? 'el-tag on' : 'el-tag no'"
          >{{ item.name }}</el-tag
        >
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <ul v-show="image_show" class="image_click">
      <router-link tag="li" to="/dashboard">首页</router-link>
      <li></li>
      <li @click="out">退出登录</li>
    </ul>
  </div>
</template>

<script>
import Left from "@/components/dashboard/left";
export default {
  components: {
    Left
  },
  data() {
    return {
      image_show: false
    };
  },
  computed: {
    tag() {
      return this.$store.state.tag;
    }
  },
  methods: {
    // 切换侧边栏显示隐藏
    toggle() {
      if (this.$store.state.msg == "") {
        this.$refs.i.style.transform = "rotate(0deg)";
      } else {
        this.$refs.i.style.transform = "rotate(90deg)";
      }
      this.$store.commit("toggle");
    },
    //切换点击吉他图片显示隐藏
    image_toggle() {
      this.image_show = !this.image_show;
    },
    //退出登录
    out() {
      // 清空token
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    //点击标签跳转
    tag_path(item, index) {
      console.log(item, index);
      this.$store.commit("click_tag", item);
      this.$router.push({ path: item.path });
    },
    //点击删除标签
    tag_close(item, index) {
      console.log(item, index);
      let state = {
        tag: this.tag
      };
      let obj = {
        item: item,
        index: index
      };
      if (state.tag.length == 1 && state.tag[0].name == "首页") {
        return;
      }
      state.tag.splice(obj.index, 1);
      if (state.tag.length == 0) {
        let obj = {
          name: "首页",
          path: "/dashboard",
          state: true
        };
        state.tag.push(obj);
      }
      state.tag.forEach(v => {
        v.state = false;
      });
      if (obj.index == state.tag.length) {
        state.tag[state.tag.length - 1].state = true;
        this.$router.push({
          path: state.tag[state.tag.length - 1].path
        });
      } else {
        state.tag[obj.index].state = true;
        this.$router.push({
          path: state.tag[obj.index].path
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
#dashboard {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  overflow: auto;
  display: flex;
  > div:nth-of-type(1) {
    transition: all 0.4s;
    background: #304156;
  }
  > div:nth-of-type(2) {
    width: 100%;
    transition: all 0.4s;
  }
}
.narrow {
  width: 64px;
}
.width {
  width: 206x;
}
.el-icon-sort {
  font-size: 26px;
  // transform: rotate(90deg);
  transition: all 0.4s;
}
.top_top {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #f5f5f5;
  > i:nth-of-type(1) {
    margin-left: 10px;
    float: left;
    margin-top: 11px;
  }
  > div:nth-of-type(1) {
    float: left;
    margin-left: 20px;
    margin-top: 17px;
  }
  > img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    float: right;
    margin-right: 30px;
    margin-top: 5px;
    cursor: pointer;
  }
}
.top_bottom {
  width: 100%;
  height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow: auto;
  display: flex;
  align-items: center;
}
.el-tag {
  color: #495060;
  height: 28px;
  line-height: 28px;
  border-color: #d8dce5;
  border-radius: 2px;
  margin-left: 6px;
  cursor: pointer;
}
.on {
  background: #42b983;
  color: white;
}
.no {
  background: white;
  color: #495060;
}
.el-tag:nth-of-type(1) {
  margin-left: 16px;
}
.el-tag__close {
  color: #495060;
}
.el-breadcrumb__inner {
  font-size: 30px !important;
}
.image_click {
  width: 98px;
  height: 107px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 60px;
  right: 32px;
  z-index: 1;
  background: white;
  transition: all 0.4s;
  > li {
    width: 66px;
    height: 36px;
    margin: 3px auto;
    padding: 0 16px;
    line-height: 36px;
    margin-top: 12px;
  }
  > li:nth-of-type(2) {
    width: 100%;
    height: 1px;
    background: #ebeef5;
    margin-top: 0px;
    line-height: 1px;
    margin: 0;
  }
  > li:hover {
    background: #ecf5ff;
    color: #66b1ff;
    cursor: pointer;
  }
}
.content {
  padding: 20px;
  overflow: scroll;
  height: calc(100% - 126px);
  overflow-x: hidden;
  min-width: 1200px;
}

.content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}
</style>
