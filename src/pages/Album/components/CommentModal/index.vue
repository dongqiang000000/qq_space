<template>
  <div class="album-comment-modal">
    <AlbumModal
      :title="`${commentList && commentList.length}条评论`"
      @close="close"
    >
      <template slot="body">
        <div class="total-like">
          <span class="icon"></span>
          <span class="txt">
            {{ likedUserListStr }} 等{{
              (likedList && likedList.length) || 0
            }}人觉得很赞
          </span>
        </div>

        <div class="comment-list" v-if="commentList">
          <div class="comment" v-for="(comment, i) in commentList" :key="i">
            <img :src="comment.avatar" alt="" class="avatar" />
            <div class="detail">
              <div class="username">{{ comment.nick }}</div>
              <div class="time">{{ comment.time }}</div>
              <div class="txt">{{ comment.txt }}</div>
            </div>
            <div class="options">
              <button class="btn-like"></button>
              <button class="btn-comment"></button>
            </div>
          </div>
        </div>

        <div class="comment-input">
          <input type="text" v-model="commentTxt" placeholder="我也说一句...">
        </div>
      </template>
    </AlbumModal>
  </div>
</template>

<script>
import AlbumModal from '../AlbumModal.vue';

export default {
  name: 'CommentModal',
  components: {
    AlbumModal
  },
  props: ['likedList', 'commentList', 'userInfo'],
  data: function() {
    return {
      commentTxt: ''
    }
  },
  computed: {
    myLike() {
      if (this.likedList && this.userInfo) {
        return this.likedList.some(item => item.nick === this.userInfo.nick);
      }
      return false;
    },
    likedUserListStr() {
      if (this.likedList) {
        const userList = this.likedList.map(user => user.nick) || [];
        return userList.slice(0, 5).join('，');
      }
      return '';
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
  background: #fff;
  .modal-body {
    .total-like {
      height: px2rem(48);
      padding-left: px2rem(20);
      font-size: px2rem(14);
      line-height: px2rem(48);
      color: #8f8f8f;
      text-align: left;
      .icon {
        display: inline-block;
        width: px2rem(16);
        height: px2rem(15);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-like.png)
          no-repeat center / contain;
        margin-right: px2rem(5);
      }
    }
    .comment-list {
      .comment {
        padding-top: px2rem(20);
        display: flex;
        padding-left: px2rem(20);
        position: relative;
        .avatar {
          width: px2rem(40);
          height: px2rem(40);
          border-radius: 50%;
          margin-right: px2rem(12);
        }
        .detail {
          .username {
            line-height: px2rem(20);
            font-size: px2rem(14);
          }
          .time {
            font-size: px2rem(12);
            line-height: px2rem(17);
            color: #737373;
            padding-top: px2rem(5);
          }
          .txt {
            font-size: px2rem(15);
            line-height: px2rem(21);
            color: #0c0c0c;
            padding-top: px2rem(14);
          }
        }
        .options {
          position: absolute;
          top: px2rem(15);
          right: px2rem(15);
          display: flex;
          .btn-like,
          .btn-comment {
            width: px2rem(30);
            height: px2rem(30);
            border: none;
            &:focus {
              outline: none;
            }
          }
          .btn-like {
            background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/like.png)
              no-repeat center / px2rem(20);
            margin-right: px2rem(18);
          }
          .btn-comment {
            background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/comment.png)
              no-repeat center / px2rem(20);
          }
        }
      }
    }
    .comment-input {
      height: px2rem(50);
      border-top: 1px solid #F7F7F7;
      padding: px2rem(10) px2rem(20);
      box-sizing: border-box;
      position: fixed;
      z-index: 200;
      bottom: 0;
      left: 0;
      right: 0;
      > input {
        width: 100%;
        height: px2rem(29);
        background: #FFFFFF;
        border: 1px solid #F1F1F1;
        box-sizing: border-box;
        padding: 0 px2rem(12);
        font-size: px2rem(12);
        &:focus {
          outline: none;
        }
        &::placeholder {
          color: #C2C2C2;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/lib.scss';
.album-comment-modal .modal .modal-name {
  .btn-left {
    width: px2rem(41);
    box-sizing: border-box;
    background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
      no-repeat center / px2rem(11) px2rem(21);
    filter: brightness(100);
  }
}
</style>
