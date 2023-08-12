<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="topLeft">
      <svg class="icon bofang" aria-hidden="true" @click="BackHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="letfMarquee">
        <Vue3Marquee>{{ musicList.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">
          {{ item.name }}&nbsp;&nbsp;</span>
        <svg class="icon bofang" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="topRight">
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_actvie: !isbthShow }">
    <img src="@/assets/disc-plus.png" alt="" class="img_cd">
    <img :src="musicList.al.picUrl" alt="" class="img_ar" @click="isLyricShow = true"
      :class="{ img_ar_active: !isbthShow, img_ar_paues: isbthShow }">
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
    <p v-for="item in lyric" :key="item"
      :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre) }">
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-xiazai1"></use>
      </svg>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-changpianji"></use>
      </svg>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-Xaoxi"></use>
      </svg>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon b" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="isbthShow" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-icon_bofang"></use>
      </svg>
      <svg class="icon " aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import { mapMutations, mapState } from 'vuex';
// import 'vue3-marquee/dite/style.css'

export default {
  data() {
    return {
      isLyricShow: false
    }
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playlist', 'playlistIndex', 'duration']),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mis = item.slice(7, 10);
          let lrc = item.slice(11, item.length)
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mis);
          // console.log(lrc);
          if (isNaN(Number(mis))) {
            mis = item.slice(7, 9);
            lrc = item.slice(10, item.length)
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mis);
          }


          return { min, sec, mis, lrc, time }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            let itemnew = item
            itemnew.pre = 0


          }
          else {
            let itemnew = item
            itemnew.pre = arr[i + 1].time
          }

        });
      }

      // console.log(arr);
      return arr
    }
  },
  mounted() {
    // console.log(this.musicList);
    this.addDuration()
  },
  props: ['musicList', 'isbthShow', 'play', 'addDuration'],
  methods: {
    BackHome: function () {
      this.isLyricShow = false
      this.updateDetailShow()
    },
    goPlay: function (num) {
      let index = this.playlistIndex + num
      if (index < 0) {
        index = this.playlist.length - 1
      } else if (index == this.playlist.length) {
        index = 0
      }
      this.updatePlaylistIndex(index)

    },
    ...mapMutations(['updateDetailShow', 'updatePlaylistIndex'])
  },
  watch: {
    currentTime: function (newvalue) {
      let p = document.querySelector("p.active")
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300
        }
      }
      if (newvalue == this.duration) {

        if (this.playlistIndex == this.playlist.length - 1) {
          // this.updatePlaylistIndex(0);
          this.goPlay()
        }
        else {
          this.updatePlaylistIndex(this.playlistIndex + 1)
        }
      }

    }

  },
  components: {
    Vue3Marquee,
  },
}
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .topLeft {
    display: flex;
    align-items: center;

    .letfMarquee {
      width: 2rem;
      height: 100%;
      margin-left: 0.4rem;

      p {
        color: #fff;
      }

      span {
        font-size: 12px;
        line-height: 5px;
        color: #626060;
      }

      .icon {
        line-height: 5px;
        width: 0.2rem;
        height: 0.2rem;
        fill: #626060;
      }
    }
  }

  .topRight {
    margin-right: 20px;
  }

}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }

  .img_needle_actvie {
    width: 2.4rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;

  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.2rem;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_paues {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }

  }
}

.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;

  p {
    color: #dcd8d8;
    margin-bottom: 15px;
  }

  .active {
    color: #fff;
    font-size: .6rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  bottom: 0.2rem;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;

  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;


    .icon {
      fill: #f0e5e5;
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .footerContent {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;

    .range {
      width: 100%;
      height: 0.03rem;
      fill: aqua;
    }
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    padding: 10px;
    align-items: center;

    .icon {
      fill: #fff;
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
