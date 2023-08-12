<template>
  <div class="ItemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg">
    <div class="itemleft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemright">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-L31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="ItemMusicFM">
    <div class="MusicFM">
      <img :src="playlist.coverImgUrl" alt="">
      <span class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-L24gl-play"></use>
        </svg>
        {{ changeCount(playlist.playCount) }}
      </span>
    </div>
    <div class="MusicNR">
      <p class="right_one">{{ playlist.name }}</p>
      <div class="right_img" v-if="playlist.creator != null">
        <img :src="playlist.creator.backgroundUrl" alt="">
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="right_tow">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
  </div>
  <div class="iconList">
    <div class="itemlist">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Xaoxi"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="itemlist">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>

    <div class="itemlist"><svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-l24px"></use>
      </svg>
      <span>下载</span>
    </div>

    <div class="itemlist">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
      </svg>
      <span>多选</span>
    </div>

  </div>
</template>
<script>

export default {
  setup(props) {
    console.log(props);
    // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的数据
    // if (props.playlist.creator === '') {
    //   props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator;
    // }
    function changeCount(num) {
      let nums = num;
      if (num >= 100000000) {
        nums = `${(num / 100000000).toFixed(1)} 亿`;
      }
      if (num >= 10000) {
        nums = `${(num / 10000).toFixed(1)} 万`;
      }
      return nums;
    }
    return { changeCount };
  },
  props: ['playlist'],
};
</script>
<style lang="less" scoped>
.ItemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // padding: .2rem;
  .itemleft,
  .itemright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 .2rem;

    span {
      font-size: .4rem;
      color: white;
    }

    .icon {
      fill: #ffffff;

    }

  }

  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}

.ItemMusicFM {
  width: 100%;
  height: 3.1rem;
  margin: 15px;
  margin-top: 20px;
  display: flex;

  .playCount {
    position: absolute;
    top: 75px;
    left: 60px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      fill: #fff;
      width: 25px;
      height: 25px;
      position: relative;
      left: 0px;
      top: 0px;

    }
  }

  .MusicFM {
    width: 3.2rem;
    height: 3rem;

    img {
      width: 2.8rem;
      height: 3rem;
      border-radius: 10px;
    }
  }

  .MusicNR {
    width: 3.8rem;
    height: 3rem;

    .right_img {
      margin-bottom: 10px;
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;

      }

      span {
        color: #fff;
      }

      .icon {
        width: 12px;
        height: 12px;
        fill: #fff;
      }
    }

    .right_one {
      color: #fff;
      margin-bottom: 10px;
    }

    .right_tow {
      width: 100%;
      max-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      flex-direction: column;

      span {
        color: #d3d3d3;
        font-size: 5px;
      }
    }
  }
}

.iconList {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .itemlist {
    display: flex;
    align-items: center;
    flex-direction: column;

    span {
      color: #fff;
    }
  }

  .icon {
    fill: #fff;
  }
}
</style>
