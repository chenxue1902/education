import request from "./request"; //引入axios的封装方法

let api = "http://www.wyunfei.com:8002/apis";

export const LeftMenu = params => {
  return request("post", api + "/system/pc/menu/user/list", params); //登陆管理员获取自身信息
};
