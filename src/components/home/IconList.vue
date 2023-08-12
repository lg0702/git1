<template>
  <div class="iocnList">
    <div class="iocnItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iocnItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-MV"></use>
      </svg>
      <span>私人MV</span>
    </div>
    <div class="iocnItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iocnItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang-"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.iocnList {
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .iocnItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
