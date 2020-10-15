<template>
  <div class="edit-modal">
    <div class="edit-modal-inner">
      <AlbumModal title="编辑相册" @close="close">
        <template slot="btn-left">取消</template>
        <template slot="btn-right">保存</template>
        <template slot="body">
          <div class="container">
            <div class="item album-name">{{ album && album.name }}</div>
            <div v-if="album && album.desc" class="item album-desc">
              {{ album && album.desc }}
            </div>
            <div class="item album-change-cover" @click="showCoverModal = true">
              <span>更换封面</span>
              <span class="icon"></span>
            </div>
            <div class="item album-set-private">
              <span>权限</span>
              <span class="private">{{ privateTxt }}</span>
              <span class="icon"></span>
            </div>
            <div class="item album-set-private">
              相册置顶<span class="hint">(其他置顶相册将被替换)</span>
              <div
                class="switch"
                :class="{ on: switchOn }"
                @click="switchOn = !switchOn"
              >
                <div class="circle"></div>
              </div>
            </div>
          </div>
          <button class="btn-delete">删除相册</button>
        </template>
      </AlbumModal>
    </div>

    <div class="cover-change-modal" v-if="showCoverModal">
      <AlbumModal :title="album && album.name" @close="showCoverModal = false">
        <template slot="body">
          <ImgList :album="album" />
        </template>
      </AlbumModal>
    </div>
  </div>
</template>

<script>
import AlbumModal from '../AlbumModal.vue';
import ImgList from '../ImgList.vue';

export default {
  name: 'EditModal',
  components: {
    AlbumModal,
    ImgList
  },
  props: ['album'],
  data: function() {
    return {
      switchOn: false,
      showCoverModal: false
    };
  },
  computed: {
    privateTxt() {
      return this.album && this.album.private ? '私密' : '公开';
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;
.edit-modal {
  .edit-modal-inner .modal-body {
    .container {
      background: #fff;
      padding-left: px2rem(20);
      .item {
        padding: px2rem(15) 0;
        border-bottom: 1px solid #f7f7f7;
        text-align: left;
        color: $txtColor;
        font-size: px2rem(14);
        line-height: px2rem(20);
        position: relative;
        &:last-child {
          border: none;
        }
        .icon {
          position: absolute;
          top: 0;
          right: 0;
          width: px2rem(47);
          height: px2rem(50);
          background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/album-arrow-right.png)
            no-repeat center / px2rem(7) px2rem(14);
        }
      }
      .album-name {
        font-size: px2rem(15);
        line-height: px2rem(21);
      }
      .album-desc {
        font-size: px2rem(15);
        line-height: px2rem(21);
        color: #9f9f9f;
        padding-right: px2rem(20);
      }
      .album-set-private {
        .switch {
          width: px2rem(56);
          box-sizing: border-box;
          border-radius: px2rem(28);
          padding: px2rem(2);
          background: #f1f1f1;
          position: absolute;
          top: px2rem(11);
          right: px2rem(20);
          transition: all 0.2s;
          .circle {
            width: px2rem(24);
            height: px2rem(24);
            border-radius: 50%;
            background: #fff;
            margin-left: 0;
          }
          &.on {
            background: #00a3ff;
            .circle {
              margin-left: px2rem(27);
            }
          }
        }
      }
      .hint {
        margin-left: px2rem(8);
        font-size: px2rem(12);
        color: #a6a6a6;
      }
    }
    .btn-delete {
      width: calc(100% - #{px2rem(40)});
      height: px2rem(42);
      margin: px2rem(20) px2rem(20) 0;
      background: #ff6363;
      border-radius: px2rem(6);
      color: #fff;
      font-size: px2rem(16);
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/lib.scss';
.edit-modal .cover-change-modal .modal {
  background: #fff;
  .modal-name {
    .btn-left {
      width: px2rem(41);
      box-sizing: border-box;
      background: url(https://qgt-document.oss-cn-beijing.aliyuncs.com/P3-5-Vue/qzone/page-header-arrow.png)
        no-repeat center / px2rem(11) px2rem(21);
      filter: brightness(100);
    }
  }
}
</style>
