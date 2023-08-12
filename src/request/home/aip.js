import service from '..';
// 获取首页轮播图
export function getBanner() {
  return service({
    method: 'GET',
    url: '/banner?type=2',
  });
}
// 获取发现歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10',
  });
}
//搜索
export function getSearch(data) {
  return service({
    method: 'GET',
    url: `/search?keywords= ${data}`
  });
}
//登录
export function getPhone(data) {
  return service({
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password} `
  });
}
