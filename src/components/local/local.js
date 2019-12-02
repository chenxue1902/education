const store = {
  save(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  fetch(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
};
export default store;
