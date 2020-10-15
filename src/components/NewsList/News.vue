<template>
  <div class="news">
    <div class="news-header">
      <img :src="news && news.user.avatar" alt="" class="avatar" />
      <div class="detail">
        <div class="nick">{{ news && news.user.nick }}</div>
        <div class="time">{{ news && news.content.time }}</div>
      </div>
      <div class="btn-menu" @click="openOptMenu"></div>
    </div>
    <div class="news-content">
      <div class="content-txt">{{ news && news.content.txt }}</div>
      <div class="content-imgs" v-if="news && news.content.imgList">
        <img
          v-for="img in news.content.imgList"
          :key="img"
          alt=""
          :src="img"
          :class="{ single: news.content.imgList.length === 1 }"
        />
      </div>
      <div class="content-video" v-if="news && news.content.video">
        <video
          controls
          class="video"
          ref="video"
          :src="news.content.video.url"
        ></video>
      </div> 
    </div>
    <div class="news-footer">
      <div class="options">
        <div class="visited-num">
          浏览{{ news && news.content.visitedNum }}次
        </div>
        <div class="btns">
          <button
            v-if="news && news.liked"
            class="btn-liked"
            @click="handleLike"
          ></button>
          <button v-else class="btn-like" @click="handleLike"></button>
          <button class="btn-comment" @click="focusToComment"></button>
        </div>
      </div>

      <div class="liked-num">
        {{ likedTxt }}
      </div>

      <div class="comments" v-if="commentList.length">
        <div
          class="comment"
          v-for="(comment, index) in commentList"
          :key="'comment' + index"
        >
          <span class="username">{{ comment.userName }}</span>
          <span v-if="comment.feedUserName">
            回复 <span class="username">{{ comment.feedUserName }}</span></span
          >：{{ comment.txt }}
        </div>
      </div>

      <div class="option-comment">
        <input
          ref="commentInput"
          type="text"
          v-model="comment"
          placeholder="评论"
          @keyup.enter="addComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  props: ['news', 'newsIdx'],
  computed: {
    commentList() {
      return (this.news && this.news.content.commentList) || [];
    },
    likedTxt() {
      const likedList = (this.news && this.news.content.likedList) || [];
      const len = likedList.length || 0;
      return len > 1 ? `${likedList[0]}等${len}人觉得很赞` : likedList[0];
    }
  },
  data: function() {
    return {
      comment: ''
    };
  },
  methods: {
    openOptMenu() {
      this.$emit('openOptMenu', this.newsIdx);
    },
    // 点赞行为
    handleLike() {
      this.$emit('handleLike', this.newsIdx);
    },
    // 聚焦评论输入框
    focusToComment() {
      this.$refs.commentInput.focus();
    },
    // 评论行为
    addComment() {
      this.$emit('addComment', this.newsIdx, this.comment);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.news {
  button {
    border: none;
    background: none;
    &:focus {
      outline: none;
    }
  }
}

.news {
  padding: px2rem(15) px2rem(20);
  border-bottom: px2rem(10) solid #f5f5f5;
  .news-header {
    display: flex;
    .avatar {
      width: px2rem(40);
      height: px2rem(40);
      border-radius: 50%;
    }
    .detail {
      flex: 1;
      text-align: left;
      margin-left: px2rem(9);
      .nick {
        font-size: px2rem(14);
        line-height: px2rem(20);
      }
      .time {
        margin-top: px2rem(5);
        font-size: px2rem(12);
        line-height: px2rem(17);
        color: #737373;
      }
    }
    .btn-menu {
      width: px2rem(20);
      height: px2rem(20);
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/menu.png)
        no-repeat center px2rem(8) / px2rem(16) px2rem(4);
    }
  }
  .news-content {
    .content-txt,
    .content-imgs {
      padding-top: 10px;
    }
    .content-txt {
      font-size: px2rem(15);
      line-height: px2rem(21);
      text-align: left;
    }
    .content-imgs {
      padding-top: 10px;
      > img {
        width: 50%;
        box-sizing: border-box;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        &.single {
          width: 100%;
        }
      }
    }
    .content-video {
      font-size: 0;
      video {
        width: 100%;
      }
    }
  }
  .news-footer {
    .options {
      height: px2rem(45);
      border-bottom: 1px solid #f7f7f7;
      display: flex;
      align-items: center;
      .visited-num {
        flex: 1;
        text-align: left;
        font-size: px2rem(12);
        line-height: px2rem(17);
        color: #737373;
      }
      .btns {
        flex: none;
        display: flex;
        align-items: center;
        .btn-liked,
        .btn-like,
        .btn-comment {
          width: px2rem(20);
          height: px2rem(20);
        }
        .btn-liked {
          background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/liked-me.png)
            no-repeat center / contain;
        }
        .btn-like {
          background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/like.png)
            no-repeat center / contain;
        }
        .btn-comment {
          margin-left: px2rem(28);
          background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/comment.png)
            no-repeat center / contain;
        }
      }
    }
    .liked-num {
      font-size: px2rem(14);
      line-height: px2rem(20);
      color: #233268;
      text-align: left;
      padding-left: px2rem(20);
      margin-top: px2rem(8);
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/liked.png)
        no-repeat top left / px2rem(16) px2rem(15);
    }
    .comments {
      padding-top: px2rem(8);
      .comment {
        text-align: left;
        font-size: px2rem(14);
        line-height: px2rem(20);
        padding-top: px2rem(10);
        &:first-child {
          padding-top: 0;
        }
        .username {
          color: #233268;
        }
      }
    }
    .option-comment {
      padding-top: px2rem(10);
      > input {
        width: 100%;
        height: px2rem(26);
        background: #f5f5f5;
        border-radius: px2rem(2);
        border: none;
        padding: 0 px2rem(13);
        box-sizing: border-box;
        font-size: px2rem(14);
        line-height: px2rem(20);
        ::placeholder {
          color: rgba($txtColor, 0.3);
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
