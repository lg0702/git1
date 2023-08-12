<template>
  <div class="itemMusicList">
    <div class="itemlistTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span>播放全部<span>(共{{ itemlist.length }}首)</span></span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏{{ "(" + changeCount(subscribedCount) + ")" }}</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemlist" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="letfSpan">{{ i + 1 }}</span>
          <div class="itemLRight">
            <p>{{ item.name }}</p>
            <div class="Ceator">
              <span v-for="(item1, index) in item.ar" :key="index">
                {{ item1.name }}&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-L31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  setup() {
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
  props: ['itemlist', 'subscribedCount'],
  methods: {
    playMusic: function (i) {
      this.updatePlaylist(this.itemlist)
      this.updatePlaylistIndex(i)
    },

    ...mapMutations(['updatePlaylist', 'updatePlaylistIndex'])
  }

};
</script>
<style lang="less" scoped>
.itemMusicList {
  padding: 0 .2rem;
  width: 100%;
  margin-top: .4rem;
  background-color: white;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;

  .itemlistTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;

    .listLeft {
      display: flex;
      align-items: center;

      .icon {
        width: .6rem;
        height: .6rem;
        margin-right: .3rem;
      }

      span {
        font-weight: bold;

        span {
          font-size: 10px;
          color: #8f8c8c;
        }

      }
    }

    .listRight {
      width: 2.3rem;
      background-color: red;
      height: .8rem;
      border-radius: .36rem;
      display: flex;
      margin: .1rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        fill: #fff;
        width: 20px;
        height: 20px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .itemList {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .itemLeft {
        display: flex;
        align-items: center;

        .letfSpan {
          margin-right: 20px;
        }

        .itemLRight {
          display: flex;
          flex-direction: column;
          padding: 10px;

          p {
            font-weight: bolder;
            margin-bottom: 5px;
          }

          .Ceator {
            display: flex;

            span {
              font-size: 13px;
              color: #9a9494;
            }
          }
        }
      }

      .itemRight {

        .bofang {
          margin-right: 20px;
          fill: rgb(201, 206, 206);
        }

      }

    }
  }
}
</style>
