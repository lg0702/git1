<template>
  <ItemMusicTop :playlist="state.playlist" />
  <itemMusicList :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount" />
</template>
<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMuiscItemList } from '@/request/home/item';
import ItemMusicTop from '@/components/item/ItemMusicTop.vue';
import itemMusicList from '@/components/item/itemMusicList.vue';

export default {
  setup() {
    const state = reactive({
      playlist: {},
      itemlist: [],
    });

    onMounted(async () => {
      const musicId = useRoute().query.id;
      // console.log(musicId);
      const res = await getMuiscItemList(musicId);
      // console.log(res);
      state.playlist = res.data.playlist;
      state.itemlist = res.data.playlist.tracks;
      // console.log(state.itemlist);
      // 防止页面刷新，数据丢失将数据保存到sessiomStrorage
      sessionStorage.setItem('itemDetail', JSON.stringify(state));
    });

    return { state };
  },
  components: {
    ItemMusicTop, itemMusicList,
  },
};
</script>
