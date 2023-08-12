import { createStore } from 'vuex';
import { getMuiscLyric } from '@/request/home/item';
import { getPhone } from '@/request/home/aip';

export default createStore({
  state: {
    playlist: [{
      al: {
        id: 2262033,
        name: "有形的翅膀",
        pic: 109951168308921440,
        picUrl: "http://p2.music.126.net/pcic3NwD7xdvHLvuT5jWWQ==/109951168308921434.jpg",
        pic_str: "109951168308921434"

      }, id: 25640392,
      name: "有形的翅膀",
      ar: [{
        name: "张韶涵"
      }]

    }],
    playlistIndex: 0,
    isbthShow: true,//暂停按钮显示
    detailShow: false,
    lyricList: {},//歌词
    currentTime: 0,// 当前的时间
    duration: 0,//歌曲总时长
    isLogin: false,//登录状态
    isFooterMusic: true,//是否显示底部音乐播放器
  },
  getters: {
  },
  mutations: {
    updateIsbthShow: function (state, value) {
      state.isbthShow = value
    },
    pushPlaylist: function (state, value) {
      state.playlist.push(value)

    },
    updatePlaylist: function (state, value) {
      state.playlist = value
      // console.log(state.playlist);
    },
    updatePlaylistIndex: function (state, value) {
      state.playlistIndex = value
    },
    updateDetailShow: function (state, value) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      state.lyricList = value
    },
    updateCurrentTime: function (state, value) {
      // console.log(state.currentTime);
      state.currentTime = value

    },
    updateDuration: function (state, value) {
      // console.log(state.duration);
      state.duration = value
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true
    }

  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMuiscLyric(value)
      // console.log(res);
      context.commit("updateLyricList", res.data.lrc)
    },
    getLogin: async function (context, value) {
      let res = await getPhone(value)
      console.log(res);
    }
  },
  modules: {
  },
});
