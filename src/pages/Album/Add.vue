<template>
  <div class="album-add">
    <div class="page-name">
      <div class="txt">新建相册</div>
      <div class="btn-back" @click="goBack">取消</div>
    </div>

    <div class="container">
      <input
        class="album-add-input"
        type="text"
        v-model="album.name"
        placeholder="添加相册名称"
      />
      <div class="setting">
        <span>权限</span>
        <button class="to-setting" @click="toSetPrivate">
          {{ privateTxt }}
        </button>
      </div>
    </div>

    <div class="btn-add" @click="confirmAdd">完成创建</div>

    <AlbumModal
      v-if="showSetModal"
      title="谁能看见"
      @close="showSetModal = false"
      @confirm="confirmSet"
    >
      <template slot="btn-right">
        <span>完成</span>
      </template>

      <template slot="body">
        <div class="setting-list">
          <div
            class="public"
            :class="{ checked: !isPrivate }"
            @click="setPrivate(false)"
          >
            所有人
          </div>
          <div
            class="private"
            :class="{ checked: isPrivate }"
            @click="setPrivate(true)"
          >
            私密
          </div>
        </div>
      </template>
    </AlbumModal>
  </div>
</template>

<script>
import AlbumModal from './components/AlbumModal.vue';

export default {
  name: 'AlbumAdd',
  components: {
    AlbumModal
  },
  data: function() {
    return {
      // albumName: '',
      album: {
        name: '',
        private: false
      },
      isPrivate: false,
      showSetModal: false
    };
  },
  computed: {
    privateTxt() {
      return this.album && this.album.private ? '私密' : '公开';
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 完成相册新建
    confirmAdd() {
      // 校验
      if (!this.album.name) {
        alert('请填写相册名称');
        return;
      }

      this.$router.push({
        path: '/album',
        query: { newAlbum: JSON.stringify(this.album) }
      });
    },
    // 设置相册属性
    toSetPrivate() {
      this.showSetModal = true;
      this.isPrivate = this.album && this.album.private;
    },
    setPrivate(isPrivate) {
      this.isPrivate = isPrivate;
    },
    confirmSet() {
      if (this.album) {
        this.album.private = this.isPrivate;
      }
      this.showSetModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;

.album-add {
  height: 100vh;
  background: #f5f5f5;
  .page-name {
    height: px2rem(50);
    line-height: px2rem(50);
    position: relative;
    font-size: px2rem(16);
    color: #ffffff;
    background: linear-gradient(96.95deg, #5adfff -2.23%, #00a3ff 101.49%);
    .btn-back {
      width: px2rem(58);
      height: px2rem(50);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .container {
    padding-left: px2rem(20);
    background: #ffffff;
    .album-add-input {
      width: 100%;
      height: px2rem(63);
      font-size: px2rem(24);
      border: none;
      border-bottom: 1px solid #f7f7f7;
      &::placeholder {
        font-size: px2rem(24);
        line-height: px2rem(63);
        color: #c0c0c0;
      }
      &:focus {
        outline: none;
      }
    }
    .setting {
      height: px2rem(40);
      text-align: left;
      font-size: px2rem(14);
      line-height: px2rem(40);
      color: #000000;
      position: relative;

      .to-setting {
        height: px2rem(40);
        position: absolute;
        top: 0;
        right: 0;
        font-size: px2rem(14);
        line-height: px2rem(20);
        color: #969696;
        padding-right: px2rem(40);
        background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-arrow-right.png)
          no-repeat px2rem(40) center / px2rem(7) px2rem(14);
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .btn-add {
    width: px2rem(335);
    height: px2rem(42);
    line-height: px2rem(42);
    background: #2cc4fd;
    border-radius: px2rem(6);
    font-size: px2rem(16);
    color: #fffdfd;
    margin: px2rem(20) auto;
  }
}
</style>

<style lang="scss">
@import '@/styles/lib.scss';

$txtColor: #000;
.album-add .modal {
  .modal-name {
    .btn-left {
      width: px2rem(41);
      box-sizing: border-box;
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
        no-repeat center / px2rem(11) px2rem(21);
      filter: brightness(100);
    }
  }
  .modal-body {
    .setting-list {
      font-size: px2rem(15);
      line-height: px2rem(50);
      color: $txtColor;
      text-align: left;
      background: #fff;
      margin-top: px2rem(10);
      .public,
      .private {
        height: px2rem(50);
        padding-left: px2rem(50);
        &.checked {
          background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-add-check.png)
            no-repeat px2rem(20) center / px2rem(20) px2rem(14);
        }
      }
    }
  }
}
</style>
