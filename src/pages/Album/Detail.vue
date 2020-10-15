<template>
  <div class="album-detail">
    <div class="banner">
      <div class="album-name">
        {{ album && album.name }}
      </div>
      <div class="subtitle">{{ albumLen }}照片</div>
      <div class="options">
        <button class="btn-like" @click="showLikeDetail">
          <span class="icon"></span>
          <span class="txt">{{ albumLikedNum }}</span>
        </button>
        <button class="btn-comment" @click="showCommentDetail">
          <span class="icon"></span>
          <span class="txt">{{ albumCommentNum }}</span>
        </button>
      </div>
      <button class="btn-back" @click="goBack"></button>
      <div class="mask" :style="bannerStyle"></div>
    </div>

    <div class="container">
      <ImgList :album="album" />
    </div>

    <div class="footer" @click="showEdit">
      <button class="btn-album-edit">
        <span class="icon"></span>
        <span class="txt">编辑相册</span>
      </button>
    </div>

    <LikeModal
      v-if="showLikeModal"
      :likedList="(album && album.likedUserList) || []"
      :userInfo="userInfo"
      @likeAlbum="likeAlbum"
      @close="showLikeModal = false"
    />

    <CommentModal
      v-if="showCommentModal"
      :likedList="(album && album.likedUserList) || []"
      :commentList="(album && album.commentList) || []"
      :userInfo="userInfo"
      @likeAlbum="likeAlbum"
      @close="showCommentModal = false"
    />

    <EditModal
      v-if="showEditModal"
      :album="album"
      @close="showEditModal = false"
    />
  </div>
</template>

<script>
import request from '@/utils/request.js';
import ImgList from './components/ImgList.vue';
import LikeModal from './components/LikeModal/index.vue';
import CommentModal from './components/CommentModal/index.vue';
import EditModal from './components/EditModal/index.vue';

export default {
  name: 'AlbumDetail',
  components: {
    ImgList,
    LikeModal,
    CommentModal,
    EditModal
  },
  data: function() {
    return {
      userInfo: null,
      album: null,
      showLikeModal: false,
      showCommentModal: false,
      showEditModal: false
    };
  },
  async mounted() {
    await this.getAlbum();
    await this.getAccount();
  },
  computed: {
    bannerStyle() {
      if (this.album) {
        return `background: url(${this.album.cover}) no-repeat center top / cover`;
      } else {
        return '';
      }
    },
    albumLen() {
      return (
        (this.album && this.album.imgList && this.album.imgList.length) || 0
      );
    },
    albumLikedNum() {
      return (
        (this.album &&
          this.album.likedUserList &&
          this.album.likedUserList.length) ||
        0
      );
    },
    albumCommentNum() {
      return (
        (this.album &&
          this.album.commentList &&
          this.album.commentList.length) ||
        0
      );
    }
  },
  methods: {
    async getAccount() {
      this.userInfo = (await request('/api/account')) || {};
    },
    async getAlbum() {
      const id = this.$route.query.id;
      if (!id) {
        return;
      }
      this.album = ((await request(`/api/getalbum?id=${id}`)) || {}).album;
    },
    goBack() {
      this.$router.go(-1);
    },
    showLikeDetail() {
      this.showLikeModal = true;
    },
    showCommentDetail() {
      this.showCommentModal = true;
    },
    showEdit() {
      this.showEditModal = true;
    },
    likeAlbum(myLike) {
      if (myLike) {
        if (this.album.likedUserList) {
          this.album.likedUserList.unshift(this.userInfo);
        } else {
          this.album.likedUserList = [this.userInfo];
        }
      } else {
        if (this.album.likedUserList) {
          this.album.likedUserList = this.album.likedUserList.filter(
            user => user.nick !== this.userInfo.nick
          );
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.album-detail {
  .banner {
    height: px2rem(186);
    position: relative;
    .album-name {
      padding-top: px2rem(50);
      font-weight: 500;
      font-size: px2rem(24);
      line-height: px2rem(34);
      color: #272727;
    }
    .subtitle {
      padding-top: px2rem(5);
      font-size: px2rem(11);
      line-height: px2rem(15);
      color: #6d6d6d;
    }
    .options {
      display: flex;
      align-items: center;
      .btn-like,
      .btn-comment {
        height: px2rem(20);
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: px2rem(15);
        .txt {
          font-size: px2rem(12);
          color: $txtColor;
        }
      }
      .btn-like .icon {
        width: px2rem(20);
        height: px2rem(19);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-like.png)
          no-repeat center / contain;
        margin-right: px2rem(8);
      }
      .btn-comment .icon {
        width: px2rem(20);
        height: px2rem(18);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-comment.png)
          no-repeat center / contain;
        margin-right: px2rem(8);
      }
    }
    .btn-back {
      width: px2rem(41);
      height: px2rem(53);
      border: none;
      position: absolute;
      left: 0;
      top: 0;
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
        no-repeat center / px2rem(11) px2rem(21);
      &:focus {
        outline: none;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      opacity: 0.5;
    }
  }
  .container {
    padding-bottom: px2rem(70);
  }
  .footer {
    height: px2rem(49);
    position: fixed;
    z-index: 200;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1px solid #ececec;
    .btn-album-edit {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .txt {
        font-size: px2rem(11);
        line-height: px2rem(15);
        color: $txtColor;
        padding-top: px2rem(4);
      }
      .icon {
        width: px2rem(22);
        height: px2rem(22);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-edit.png)
          no-repeat center / contain;
      }
    }
  }
}
</style>
