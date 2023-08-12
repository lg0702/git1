<template>
  <div>
    <TopNav />
    <SwpierTop />
    <IconList />
    <MuiscList />
  </div>
</template>

<script>

import TopNav from '@/components/home/TopNav.vue';
import SwpierTop from '@/components/home/SwpierTop.vue';
import IconList from '@/components/home/IconList.vue';
import MuiscList from '@/components/home/MuiscList.vue';

export default {
  name: 'HomeView',
  components: {
    TopNav, SwpierTop, IconList, MuiscList,
  },
};
</script>
