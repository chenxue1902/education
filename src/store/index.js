import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msg: "判断侧边栏展开或者收起",
    tag: [],
    loading: true
  },
  mutations: {
    toggle(state) {
      if (state.msg == "") {
        state.msg = "判断侧边栏展开或者收起";
      } else {
        state.msg = "";
      }
    },
    //点击标签
    click_tag(state, item) {
      state.tag.forEach(v => {
        v.state = false;
      });
      item.state = true;
    },
    //顶部动态添加标签
    tag(state, obj) {
      // console.log("对象", obj.path);
      let index = state.tag.findIndex(item => {
        return item.path == obj.path;
      });
      if (index == -1) {
        state.tag.push(obj);
        state.tag.forEach(v => {
          v.state = false;
        });
        obj.state = true;
      } else {
        state.tag.forEach(v => {
          v.state = false;
        });
        state.tag[index].state = true;
        return;
      }
      // state.tag.forEach(item => {
      //   console.log(item.path);
      //   if (item.path == obj.path) {
      //     return;
      //   } else {
      //     state.tag.push(obj);
      //   }
      // });
    }
  },
  actions: {},
  modules: {}
});
