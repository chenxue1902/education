import request from "./request"; //引入axios的封装方法

let api = "http://www.wyunfei.com:8002/apis";

// 用户管理列表
export const SysList = params => {
  return request("post", api + "/system/pc/sys/user/list", params);
};
// 添加用户选项列表
export const SysUserList = params => {
  return request("post", api + "/user/pc/user/list", params);
};
// 添加用户
export const addUserList = params => {
  return request("post", api + "/system/pc/sys/user/save", params);
};
// 设置用户状态
export const SetUser = params => {
  return request("post", api + "/system/pc/sys/user/update", params);
};
// 删除用户
export const DelUser = params => {
  return request("post", api + "/system/pc/sys/user/delete", params);
};
