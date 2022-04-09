<template>
  <div class="echarts-container">
    <a-card>
      <div class="inner">
        <h3>毕业生去向与毕业省人数趋势分析</h3>
        <a-row>
          <a-col :span="16">
            <destination-view />
          </a-col>
          <a-col :span="8">
            <graduates-view />
          </a-col>
        </a-row>
        <div>随着全国普通高校毕业生人数越来越多，选择考研人数也在逐渐增多。</div>
      </div>

      <a-divider />
      <a-divider />
      <a-divider />

      <a-divider />
      <div class="inner">
        <h3>毕业生去向省份分布分析</h3>
        <a-row>
          <a-col>
            <distribution-view />
          </a-col>
        </a-row>
        <div>选择就业的城市大多数在北上广分布居多</div>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss'

</style>