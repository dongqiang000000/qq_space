<template>
  <div class="album-page">
    <div class="page-name">
      <div class="txt">相册</div>
      <div class="detail">3相册 5照片</div>
      <div class="btn-back" @click="goBack"></div>
    </div>

    <div class="container">
      <div class="btn-add-album" @click="toAddAlbum">
        <span class="icon"></span>
        <span class="txt">新建相册</span>
      </div>

      <div
        class="album"
        v-for="(album, index) in albumList"
        :key="`album-${index}`"
        @click="gotoDetail(album.id)"
      >
        <img class="cover" :src="album.cover" alt="" />
        <div class="name">{{ album.name }}</div>
        <div class="detail">
          <span>{{ (album.imgList && album.imgList.length) || 0 }}张</span>
          <span v-if="album.private" class="private">私密</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js';

export default {
  name: 'Album',
  data: function() {
    return {
      albumList: []
    };
  },
  async mounted() {
    await this.queryAlbums();
    this.addAlbum();
  },
  methods: {
    // 添加新建相册
    addAlbum() {
      const newAlbumJSONStr = this.$route.query.newAlbum || '{}';
      const newAlbum = JSON.parse(newAlbumJSONStr);
      console.log(newAlbum);
      if (newAlbum.name) {
        // to delete
        newAlbum.cover =
          'https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-cover3.jpg';
        if (this.albumList) {
          this.albumList.unshift(newAlbum);
        }
        // todo pick 图片
      }
    },
    async queryAlbums() {
      this.albumList = (await request('/api/queryalbums')) || [];
    },
    goBack() {
      this.$router.go(-1);
    },
    toAddAlbum() {
      this.$router.push('/album/add');
    },
    gotoDetail(id) {
      this.$router.push(`/album/detail?id=${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

.album-page {
  padding-top: px2rem(53);
  .page-name {
    height: px2rem(53);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;

    .btn-back {
      width: px2rem(50);
      height: px2rem(53);
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
        no-repeat center / px2rem(11) px2rem(21);
      position: absolute;
      top: 0;
      left: 0;
    }
    .txt {
      font-size: px2rem(16);
      line-height: px2rem(22);
      color: #272727;
      padding-top: px2rem(15);
    }
    .detail {
      font-size: px2rem(11);
      line-height: px2rem(15);
      color: #aaaaaa;
    }
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    margin-left: px2rem(15);
    padding-top: px2rem(15);
    .btn-add-album,
    .album .cover {
      width: px2rem(165);
      height: px2rem(165);
      border-radius: px2rem(6);
    }
    .btn-add-album,
    .album {
      margin-right: px2rem(15);
    }
    .btn-add-album {
      font-size: px2rem(14);
      line-height: px2rem(20);
      color: #a5a5c2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #eeeeee;
      .icon {
        width: px2rem(40);
        height: px2rem(32);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-add.png)
          center / contain;
      }
      .txt {
        margin-top: px2rem(11);
      }
    }
    .album {
      font-size: 0;
      text-align: left;
      padding-bottom: px2rem(20);
      cursor: pointer;
      .name {
        padding-top: px2rem(10);
        font-weight: 500;
        font-size: px2rem(14);
        line-height: px2rem(20);
      }
      .detail {
        padding-top: px2rem(4);
        font-size: px2rem(12);
        line-height: px2rem(17);
        color: #aaaaaa;
        .private {
          margin-left: px2rem(8);
        }
      }
    }
  }
}
</style>
