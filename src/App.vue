<template>
  <router-view />
  <FooterMuisc v-show="$store.state.isFooterMusic" />
</template>
<script>
import FooterMuisc from '@/components/item/FooterMuisc.vue';

export default {
  components: {
    FooterMuisc,
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: .5rem;
  height: .5rem;
}

a {
  color: #000;
}
</style>
