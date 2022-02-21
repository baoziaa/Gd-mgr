<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共{{baseInfo.total.record}}条</div>
            <div class="title">数据</div>
          </div>
          <div class="item">
            <div class="count">共{{baseInfo.total.user}}个</div>
            <div class="title">用户</div>
          </div>
          <div class="item">
            <div class="count">共{{baseInfo.total.log}}条</div>
            <div class="title">日志</div>
          </div>
        </div>
      
    <a-divider />

    <div class="table-list">
      <div class="left">
        <record
          simple
         />
      </div>
      <div class="right">
        <log
          simple
         />
      </div>
    </div>
</a-card>
</a-spin>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>