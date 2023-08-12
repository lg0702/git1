<template>
  <div class="searchTop">
    <svg class="icon " aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="周杰伦" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="History">历史</span>
    <span v-for="item in keyWorldList" :key="item" class="spankey" @click="searchKeyHistroy(item)">
      {{ item }}</span>
    <svg class="icon " aria-hidden="true" @click="delHistroy">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="letfSpan">{{ i + 1 }}</span>
        <div class="itemLRight">
          <p>{{ item.name }}</p>
          <div class="Ceator">
            <span v-for="(item1, index) in item.artists" :key="index">
              {{ item1.name }}&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-L31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { getSearch } from '@/request/home/aip'
export default {
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList: [],
    }
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList')) || []
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey)
        //去重
        this.keyWorldList = [...new Set(this.keyWorldList)]
        //固定长度
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.pop(this.keyWorldList.length - 1)
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList))
        let res = await getSearch(this.searchKey)
        // console.log(res);
        this.searchList = res.data.result.songs
        // console.log(res.data.result.songs);
        this.searchKey = ""
      }

    },
    delHistroy: function () {
      localStorage.removeItem("keyWorldList")
      this.keyWorldList = []
    },
    searchKeyHistroy: async function (item) {
      let res = await getSearch(item)
      this.searchList = res.data.result.songs
      console.log(res);
    },
    updateIndex: function (item) {
      let itemnew = item
      itemnew.al = item.album
      itemnew.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit("pushPlaylist", item)
      this.$store.commit("updatePlaylistIndex", this.$store.state.playlist.length - 1)
    }
  }
}
</script>
<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: .1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: .2rem;
  position: relative;

  .History {
    font-weight: 700;
  }

  .spankey {
    padding: .1rem .2rem;
    background-color: #cfa5a5;
    border-radius: .4rem;
    margin: .1rem .2rem;
    display: inline-block;
  }

  .icon {
    width: .4rem;
    height: .4rem;
    position: absolute;
    top: 10px;
    right: 10px;
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
</style>
