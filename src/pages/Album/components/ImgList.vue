<template>
  <div class="album-detail-list" v-if="handledAlbum && handledAlbum.imgMap">
    <div class="wrap" v-for="(val, key) in handledAlbum.imgMap" :key="`${key}`">
      <div class="time">{{ key }}</div>
      <div class="img-list">
        <img
          class="thumbnail"
          v-for="img in val"
          :key="img"
          :src="img"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgList',
  props: ['album'],
  computed: {
    handledAlbum() {
      const imgMap = {};
      if (this.album && this.album.imgList) {
        this.album.imgList.forEach(img => {
          if (imgMap[img.time]) {
            imgMap[img.time].push(img.url);
          } else {
            imgMap[img.time] = [img.url];
          }
        });
      }
      return {
        ...this.album,
        imgMap
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.album-detail-list {
  padding-top: px2rem(30);
  margin: 0 px2rem(20);
  .wrap {
    padding-top: px2rem(20);
    &:first-child {
      padding-top: 0;
    }
    .time {
      font-weight: 500;
      font-size: px2rem(16);
      line-height: px2rem(22);
      color: #272727;
      text-align: left;
    }
    .img-list {
      padding-top: px2rem(15);
      display: flex;
      flex-wrap: wrap;
      .thumbnail {
        flex: none;
        width: px2rem(109);
        height: px2rem(109);
        margin-right: px2rem(4);
      }
    }
  }
}
</style>
