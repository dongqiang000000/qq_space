<template>
  <div>
    <div class="news-list">
      <div
        v-for="(news, index) in newsList"
        :key="index"
      >
        <News
          v-if="news && !news.invisible && !news.user.invisible"
          :news="news"
          :newsIdx="index"
          @openOptMenu="openOptMenu"
          @handleLike="handleLike"
          @addComment="addComment"
        />
      </div>
    </div>

    <div
      class="option-menu-wrap"
      v-if="showOptMenu"
    >
      <div class="option-menu">
        <div
          class="btn-slide-down"
          @click="closeOptMenu"
        ></div>
        <div
          class="btn-hide"
          @click="hideNews"
        >隐藏此条动态</div>
        <div
          class="btn-hide"
          @click="hideUser"
        >不看她的动态</div>
        <div
          class="btn-cancel"
          @click="closeOptMenu"
        >取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import News from './News.vue';

export default {
  name: 'NewsList',
  components: {
    News
  },
  props: ['newsListOriginal', 'userInfo'],
  data: function () {
    return {
      newsList: [],
      showOptMenu: false,
      newsIdx: -1
    };
  },
  watch: {
    newsListOriginal() {
      this.newsList = this.newsListOriginal;
    }
  },
  methods: {
    // 点赞行为
    handleLike(idx) {
      this.newsList[idx].liked = !this.newsList[idx].liked;

      let likedList = this.newsList[idx].content.likedList || [];
      if (this.newsList[idx].liked) {
        likedList.push(this.userInfo.nick);
      } else {
        const index = likedList.findIndex(item => item === this.userInfo.nick)
        console.log(index)
        likedList.splice(index, 1);
      }
      this.newsList[idx].content.likedList = likedList;
    },
    // 评论行为
    addComment(idx, comment) {
      const commentObj = {
        userName: this.userInfo.nick,
        txt: comment
      };
      if (this.newsList[idx].content.commentList) {
        this.newsList[idx].content.commentList.push(commentObj);
      } else {
        this.newsList[idx].content.commentList = [commentObj]
      }
    },
    // 屏蔽消息 start
    openOptMenu(idx) {
      this.showOptMenu = true;
      this.newsIdx = idx;
    },
    closeOptMenu() {
      this.showOptMenu = false;
    },
    hideNews() {
      this.newsList[this.newsIdx].invisible = true;
      this.closeOptMenu();
    },
    hideUser() {
      this.newsList.forEach(news => {
        if (news.user.nick === this.newsList[this.newsIdx].user.nick) {
          news.user.invisible = true;
        }
      });
      this.closeOptMenu();
    }
    // 屏蔽消息 end
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

.news-list {
  padding-top: px2rem(15);
}
.option-menu-wrap {
  position: fixed;
  z-index: 200;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(#000, 0.5);
  display: flex;
  align-items: flex-end;
  .option-menu {
    flex: 1;
    padding-bottom: px2rem(15);
    background: #fff;
    border-radius: px2rem(8) px2rem(8) 0 0;
    .btn-slide-down {
      width: px2rem(36);
      height: px2rem(38);
      margin: 0 auto;
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/slide-down.png)
        no-repeat center / contain;
    }
    .btn-hide {
      margin-left: px2rem(56);
      padding: px2rem(15) 0;
      font-size: px2rem(14);
      line-height: px2rem(20);
      border-bottom: 1px solid #f7f7f7;
      text-align: left;
      &:last-child {
        border: none;
      }
      &:before {
        content: '';
        display: block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        position: absolute;
        left: px2rem(20);
      }
      &:nth-of-type(2) {
        &:before {
          width: px2rem(24);
          height: px2rem(19);
          background-image: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/hide-news.png);
        }
      }
      &:nth-of-type(3) {
        &:before {
          width: px2rem(26);
          height: px2rem(19);
          background-image: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/invisible.png);
        }
      }
    }
    .btn-cancel {
      height: px2rem(40);
      background: #e9ecf1;
      border-radius: px2rem(2);
      font-size: px2rem(16);
      line-height: px2rem(40);
      margin: 0 px2rem(20);
    }
  }
}
</style>
