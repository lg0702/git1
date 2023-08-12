<template>
  <div class="FooterMuisc">
    <div class="Footrleft" @click="updateDetailShow">
      <img :src="playlist[playlistIndex].al.picUrl" alt="">
      <div>
        <p>{{ playlist[playlistIndex].name }}</p>
        <span>横滑切换上下首</span>

      </div>
    </div>
    <div class="FootrRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbthShow">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`">
    </audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
      <MusicDetail :musicList="playlist[playlistIndex]" :play="play" :isbthShow="isbthShow" :addDuration="addDuration" />
    </van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import MusicDetail from '@/components/item/MusicDetail.vue';


export default {
  data() {
    return {
      interval: 0,
    }
  },
  computed: {
    ...mapState(['playlist', 'playlistIndex', 'isbthShow', 'detailShow']),
  },
  mounted() {
    console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id)
    this.updateTime()
  },
  updated() {
    this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id)
    this.addDuration()
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbthShow(false);
        this.updateTime()//播放就调用函数传值
      } else {
        this.$refs.audio.pause();
        this.updateIsbthShow(true);
        clearInterval(this.interval)//暂停消除定时器
      }

    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration)
    },
    updateTime: function () {
      this.interval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    ...mapMutations(['updateIsbthShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
  },
  watch: {
    playlistIndex: function () {  //监听如果下标发生变化，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) { //如果是暂停状态，改变图标
        this.updateIsbthShow(false)
      }
    },
    playlist: function () {
      if (this.isbthShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsbthShow(false)
      }

    }
  },
  components: {
    MusicDetail
  }

};
</script>
<style lang="less" scoped>
.FooterMuisc {
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;

  .Footrleft {
    width: 60%;
    height: 100%;
    display: flex;
    padding: 20px;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 10px;
    }

    p {
      font-weight: bolder;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }

  .FootrRight {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;

    .icon {
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }
  }

}
</style>
