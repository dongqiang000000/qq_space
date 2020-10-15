<template>
  <div class="modal">
    <div class="modal-name">
      <div class="txt">{{title}}</div>
      <div class="btn-left" @click="close">
        <slot name="btn-left"></slot>
      </div>
      <div class="btn-right" @click="confirm">
        <slot name="btn-right"></slot>
      </div>
    </div>
    <div class="modal-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumModal',
  props: ['title'],
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/lib.scss';

$txtColor: #000;
.modal {
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  animation: modalShow 0.2s linear;
  .modal-name {
    height: px2rem(50);
    line-height: px2rem(50);
    position: relative;
    font-size: px2rem(16);
    color: #ffffff;
    background: linear-gradient(96.95deg, #5adfff -2.23%, #00a3ff 101.49%);
    .btn-right,
    .btn-left {
      position: absolute;
      top: 0;
    }
    .btn-left {
      height: px2rem(50);
      padding: 0 px2rem(15);
      left: 0;
    }
    .btn-right {
      height: px2rem(50);
      padding: 0 px2rem(20);
      right: 0;
    }
  }
}

@keyframes modalShow {
  0% {
    top: 100vh;
  }
  100% {
    top: 0;
  }
}
</style>
