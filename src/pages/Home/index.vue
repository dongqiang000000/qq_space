<template>
  <div class="home-page">
    <div class="page-name" :class="{ white: turnWhite }">
      好友动态
    </div>

    <div ref="banner" class="banner">
      <img :src="userInfo.avatar" alt="" class="avatar" />
    </div>

    <div class="menu">
      <a
        v-for="menu in menuList"
        :key="menu.name"
        :href="menu.path"
        :style="getStyle(menu.name)"
      >
        {{ menu.txt }}
      </a>
    </div>

    <NewsList :newsListOriginal="newsList" :userInfo="userInfo" />
  </div>
</template>

<script>
import request from '@/utils/request.js';
import NewsList from '@/components/NewsList/index.vue';

export default {
  name: 'Home',
  components: {
    NewsList
  },
  data: function() {
    return {
      turnWhite: false,
      showOptMenu: false,
      menuList: [
        {
          name: 'album',
          txt: '相册',
          path: 'album'
        },
        {
          name: 'mood',
          txt: '说说',
          path: 'mood'
        }
      ],
      userInfo: {},
      newsList: [],
      newsIdx: -1
    };
  },
  async mounted() {
    window.addEventListener('scroll', this.handlePageName);
    await this.getAccount();
    await this.queryNewsList();
  },
  methods: {
    async getAccount() {
      this.userInfo = (await request('/api/account')) || {};
    },
    async queryNewsList() {
      this.newsList = (await request('/api/querynews')) || [];
    },
    getStyle(iconName) {
      return `background-image: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/menu-${iconName}.png);`;
    },
    handlePageName() {
      this.$nextTick(() => {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        if (
          this.$refs.banner &&
          scrollTop >= this.$refs.banner.getBoundingClientRect().height
        ) {
          this.turnWhite = true;
        } else {
          this.turnWhite = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.home-page {
  width: 100%;
  .page-name {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: px2rem(52);
    z-index: 100;
    color: #fff;
    font-size: px2rem(16);
    line-height: px2rem(52);
    transition: all 0.2s;
    &.white {
      background: #fff;
      color: #272727;
    }
  }
  .banner {
    height: px2rem(186);
    background: url('https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/banner-bg.jpg')
      center / cover;
    position: relative;
    .avatar {
      width: px2rem(60);
      height: px2rem(60);
      border-radius: 50%;
      position: absolute;
      left: px2rem(30);
      bottom: px2rem(30);
      
    }
  }
  .menu {
    height: px2rem(65);
    display: flex;
    margin: 0 px2rem(20);
    box-sizing: border-box;
    padding: px2rem(10) 0 px2rem(7);
    border-bottom: 1px solid #f2f2f2;
    a {
      flex: 1;
      font-size: px2rem(12);
      line-height: px2rem(17);
      background-size: px2rem(26);
      background-repeat: no-repeat;
      background-position: center top;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      color: $txtColor;
    }
  }
}
</style>
