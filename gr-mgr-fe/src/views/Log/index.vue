<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
      <h2>操作日志</h2>

      <a-divider />

      <div>
        <a-table
          bordered
          :columns="columns"
          :data-source="list"
          :pagination = "false"
        >
          <template #createdAt="{ record }">
            <!-- {{record}} -->
            {{ formatTimestampDetail(record.meta.createdAt) }}
          </template>
          <template #action="{record}">
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
        <space-end style="margin-top: 24px;">
          <a-pagination
            v-model:current="curPage"
            :pageSize="20"
            :total="total"
            @change="setPage"
          />
        </space-end>

      </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';

</style>