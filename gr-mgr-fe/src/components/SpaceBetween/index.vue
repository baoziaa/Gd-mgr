// ! 在main.js函数中引入注册就可以在全局中使用了
// todo 两端对齐组件
<template>
  <div class="space-between">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .space-between {
    display: flex;
    justify-content: space-between;
  }
</style>
