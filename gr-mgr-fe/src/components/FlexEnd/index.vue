// ! 在main.js函数中引入注册就可以在全局中使用了
// todo 尾端对齐组件
<template>
  <div class="flex-end">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
</style>
