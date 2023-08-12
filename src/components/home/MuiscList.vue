<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" class="my-swpie" :show-indicators="false">
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-L24gl-play"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue';
import { getMusicList } from '@/request/home/aip';

// Vue2的方法
export default {
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   async getGedan() {
  //     const res = await getMusicList();
  //     // console.log(res.data.result);
  //     this.musicList = res.data.result;
  //   },
  //   changeCount(num) {
  //     let nums = num;
  //     if (num >= 100000000) {
  //       nums = `${(num / 100000000).toFixed(1)} 亿`;
  //     }
  //     if (num >= 10000) {
  //       nums = `${(num / 10000).toFixed(1)} 万`;
  //     }
  //     return nums;
  //   },
  // },
  // mounted() {
  //   this.getGedan();
  // },
  // Vue3的写法
  setup() {
    const state = reactive({
      musicList: [],
    });
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
    onMounted(async () => {
      const res = await getMusicList();
      // console.log(res);
      state.musicList = res.data.result;
      // console.log(state.musicList);
    });
    return { state, changeCount };
  },
};

</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }

  .musicContent {
    width: 100%;
    height: 4rem;

    .my-swpie {
      height: 100%;

      img {
        width: 100%;
        height: 150px;
        border-radius: 0.4rem;
        padding: 0.2rem;
      }

      .playCount {
        position: absolute;
        top: 0.26rem;
        left: 1.2rem;
        font-size: 0.2rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 0.4rem;
          height: 0.4rem;
          fill: white;
        }
      }

      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;

      }
    }
  }
}
</style>
