<template>
  <div class="mood-page">
    <div class="page-name">
      <span>说说</span>
      <div class="btn-back" @click="goBack"></div>
    </div>

    <div class="add-news" @click="addNews">
      <div class="avatar">
        <img :src="userInfo && userInfo.avatar" alt="" />
      </div>
      <div class="post-input">分享新鲜事</div>
    </div>

    <NewsList :newsListOriginal="myNewsList" :userInfo="userInfo" />
  </div>
</template>

<script>
import NewsList from '@/components/NewsList/index.vue';
import request from '@/utils/request.js';

export default {
  name: 'Mood',
  components: {
    NewsList
  },
  data: function() {
    return {
      myNewsList: [],
      userInfo: {},
      mood: ''
    };
  },
  async mounted() {
    await this.getAccount();
    await this.queryMyNewsList();
  },
  methods: {
    async getAccount() {
      this.userInfo = (await request('/api/account')) || {};
    },
    async queryMyNewsList() {
      this.myNewsList = (await request('/api/querymynews')) || [];
    },
    goBack() {
      this.$router.go(-1);
    },
    addNews() {
      this.$router.push('/mood/add');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

.mood-page {
  padding-top: px2rem(50);
  .page-name {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: px2rem(50);
    line-height: px2rem(50);
    font-size: px2rem(16);
    color: #272727;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    .btn-back {
      width: px2rem(50);
      height: px2rem(50);
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
        no-repeat center / px2rem(11) px2rem(21);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .add-news {
    display: flex;
    align-items: center;
    padding: px2rem(15) px2rem(20);
    border-bottom: px2rem(10) solid #f5f5f5;
    .avatar {
      flex: none;
      width: px2rem(40);
      height: px2rem(40);
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .post-input {
      flex: 1;
      height: px2rem(40);
      line-height: px2rem(40);
      background: #eeeeee;
      border-radius: px2rem(40);
      border: none;
      margin-left: px2rem(15);
      padding: 0 px2rem(18);
      font-size: px2rem(14);
      color: #acacac;
      text-align: left;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>

<style lang="scss">
.mood-page {
  .news-list {
    padding: 0;
  }
}
</style>
