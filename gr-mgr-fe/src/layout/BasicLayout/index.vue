<template>
  <div class="basic-layout">
    <div class="gr-header">
      <div class="header-left">
        <img src="../../../public/logo.png" alt="">
        <div class="title">毕业生去向管理系统</div>
      </div>
      <div class="header-right">
        <div class="hello-msg">你好,帅包包\(￣︶￣*\))</div>
        <div class="logout">退出</div>
      </div>
    </div>
    <div class="gr-header-placeholder"></div>
    <div class="gr-content">
      <div class="sidebar-left">
        <app-nav />
      </div>
      <div class="content-right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src='./index.js'></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
