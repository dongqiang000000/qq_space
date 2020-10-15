<template>
  <div class="album-like-modal">
    <AlbumModal title="赞" @close="close">
      <template slot="body">
        <div class="total-like">
          总赞量：{{ (likedList && likedList.length) || 0 }}
        </div>

        <div class="my-like" :class="{ liked: myLike }" @click="handleLike">
          <span class="icon"></span>
          <span class="txt">{{ myLike ? '取消' : '' }}赞</span>
        </div>

        <div class="user-list" v-if="likedList">
          <div class="user" v-for="(user, i) in likedList" :key="i">
            <img :src="user.avatar" alt="" class="avatar" />
            <div class="username">
              {{ user.nick === userInfo.nick ? '我' : user.nick }}
            </div>
          </div>
        </div>
      </template>
    </AlbumModal>
  </div>
</template>

<script>
import AlbumModal from '../AlbumModal.vue';

export default {
  name: 'LikeModal',
  components: {
    AlbumModal
  },
  props: ['likedList', 'userInfo'],
  computed: {
    myLike() {
      if (this.likedList && this.userInfo) {
        return this.likedList.some(item => item.nick === this.userInfo.nick);
      }
      return false;
    }
  },
  methods: {
    // 相册点赞行为
    handleLike() {
      this.$emit('likeAlbum', !this.myLike);
    },
    close() {
      this.$emit('close');
    },
    confirm() {}
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.modal {
  .modal-body {
    .total-like {
      height: px2rem(48);
      padding-left: px2rem(20);
      font-size: px2rem(14);
      line-height: px2rem(48);
      color: #8f8f8f;
      text-align: left;
    }
    .my-like {
      height: px2rem(40);
      display: flex;
      align-items: center;
      padding-left: px2rem(20);
      background: #fff;
      font-size: px2rem(14);
      .icon {
        width: px2rem(20);
        height: px2rem(19);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-like.png)
          no-repeat center / contain;
        margin-right: px2rem(12);
      }
      &.liked {
        .icon {
          background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-like-me.png)
            no-repeat center / contain;
        }
      }
    }
    .user-list {
      margin-top: px2rem(20);
      .user {
        display: flex;
        align-items: center;
        padding-left: px2rem(20);
        background: #fff;
        .avatar {
          width: px2rem(40);
          height: px2rem(40);
          border-radius: 50%;
          margin-right: px2rem(12);
        }
        .username {
          height: px2rem(70);
          line-height: px2rem(70);
          font-size: px2rem(14);
          border-bottom: 1px solid #f7f7f7;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/lib.scss';
.album-like-modal .modal .modal-name {
  .btn-left {
    width: px2rem(41);
    box-sizing: border-box;
    background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
      no-repeat center / px2rem(11) px2rem(21);
    filter: brightness(100);
  }
}
</style>
