<template>
  <div class="news-add">
    <div class="page-name">
      <div class="btn-cancel" @click="goBack">取消</div>
      说说
      <div class="btn-add" @click="addNews">发表</div>
    </div>

    <div class="userinfo">
      <img :src="userInfo && userInfo.avatar" alt="" class="avatar" />
      <div class="username">{{ userInfo && userInfo.nick }}</div>
    </div>

    <div class="container">
      <textarea
        rows="6"
        type="text"
        v-model="mood"
        placeholder="分享新鲜事......"
      />
    </div>

    <div class="photo">
      <div class="photo-picked"></div>
      <div class="btn-add-photo" @click="pickPhoto">
        <span class="icon"></span>
        <span>照片/视频</span>
      </div>
    </div>
    <!-- <input  type="file"  accept="image/*" multiple="multiple" />  -->
  </div>
</template>

<script>
import request from '@/utils/request.js';

export default {
  name: 'AddNews',
  data: function() {
    return {
      userInfo: {},
      mood: ''
    };
  },
  async mounted() {
    await this.getAccount();
  },
  methods: {
    async getAccount() {
      this.userInfo = (await request('/api/account')) || {};
    },
    goBack() {
      this.$router.go(-1);
    },
    addNews() {
      const news = {
        user: this.userInfo,
        content: {
          time: new Date().toJSON(),
          txt: this.mood,
          imgList: []
        },
        liked: false
      }
      console.log(news)
      // todo
    },
    pickPhoto() {
      // todo
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.news-add {
  height: 100vh;
  background: #f5f5f5;
  .page-name {
    height: px2rem(50);
    font-size: px2rem(16);
    line-height: px2rem(50);
    color: #272727;
    border-bottom: px2rem(10) solid #f5f5f5;
    background: #fff;
    position: relative;
    .btn-cancel {
      width: px2rem(72);
      height: px2rem(50);
      position: absolute;
      left: 0;
      top: 0;
    }
    .btn-add {
      height: px2rem(22);
      line-height: px2rem(22);
      border-radius: px2rem(22);
      padding: 0 px2rem(11);
      font-size: 14px;
      color: #ffffff;
      background: #1daeff;
      position: absolute;
      right: px2rem(12);
      top: px2rem(14);
    }
  }
  .userinfo {
    display: flex;
    align-items: center;
    background: #fff;
    padding: px2rem(15) px2rem(20);
    .avatar {
      width: px2rem(40);
      height: px2rem(40);
      border-radius: 50%;
    }
    .username {
      margin-left: px2rem(10);
      font-size: px2rem(16);
      color: $txtColor;
    }
  }
  .container {
    background: #fff;
    padding-top: px2rem(5);
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 0 px2rem(20);
      &::placeholder {
        font-size: px2rem(15);
        line-height: 21px;
        color: #c9c9c9;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .photo {
    padding: px2rem(20);
    background: #fff;
    .btn-add-photo {
      width: px2rem(100);
      height: px2rem(100);
      border-radius: px2rem(2);
      font-size: px2rem(12);
      line-height: px2rem(17);
      color: #a3a3a3;
      padding-top: px2rem(4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #efefef;
      .icon {
        width: px2rem(30);
        height: px2rem(25);
        margin-bottom: px2rem(10);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/mood-photo-add.png)
          no-repeat center / contain;
      }
    }
  }
}
</style>
