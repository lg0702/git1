import service from '..';
// 获取歌单详情页的数据
export function getMuiscItemList(musicId) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${musicId}`,
  });
}
export function getItemList(data) {
  return service({
    method: 'GET',
    url: `/song/url?id=${data}`,
  });
}
// 获取歌词
export function getMuiscLyric(data) {
  return service({
    method: 'GET',
    url: `/lyric?id=${data}`,
  });
}
