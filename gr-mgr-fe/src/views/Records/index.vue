<template>
  <div>
    <a-card>
      <h2>数据列表</h2>
      <!-- 分割线 -->
      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
           placeholder="根据姓名搜索"
           enter-button
           v-model:value="keyword"
           @search="onSearch"
            />
          <!-- javascript:;防止点击的时候页面会跳转 -->
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
        <a-button @click="show = true">添加一条</a-button>
      </space-between>

      <a-divider />
      <a-table
      :columns="columns"
      :data-source="list"
      :pagination = "false"
      >
        <template #graddate="data">
          {{formatTimestamp(data.record.graddate)}}
        </template>

        <template #actions="arecord">
          <a href="javascript:;" @click="remove(arecord)">删除</a>
        </template>
      </a-table>
      <space-between style="margin-top: 24px;">
        <div />
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
        />
      </space-between>
    </a-card>

    <add-one
      v-model:show="show"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss'

</style>
