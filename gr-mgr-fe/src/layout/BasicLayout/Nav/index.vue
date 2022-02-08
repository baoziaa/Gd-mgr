<template>
  <div>
    <!-- openKeys(v-model)	当前展开的 SubMenu 菜单项 key 数组 -->
    <!-- selectedKeys(v-model)	当前选中的菜单项 key 数组 -->
    <a-menu
      style="width: 100%"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      v-for="(item) in menu" 
      :key="item.url"
      v-only-admin="item.onlyAdmin"
    >
      <!-- 一级导航a-sub-menu -->
      <a-sub-menu
        v-if="item.children"
      >
      <template #title>{{ item.title }}</template>
        <a-menu-item
          @click="to(child.url)"
          v-for="(child) in item.children" 
          :key="child.url"
        >
          {{ child.title }}
        </a-menu-item>
        <!-- 二级导航a-menu-item-group -->
        <!-- <a-menu-item-group key="g1">
          <a-menu-item key="1">Option 1</a-menu-item>
          <a-menu-item key="2">Option 2</a-menu-item>
        </a-menu-item-group> -->
      </a-sub-menu>
      <a-menu-item @click="to(item.url)" :key="item.url" v-else>
        {{ item.title }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>