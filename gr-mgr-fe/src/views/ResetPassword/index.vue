<template>
  <div>
    <a-card title="密码重置申请列表">

    <a-divide />

    <a-table
      bordered
      :data-source="list"
      :columns="columns"
      :pagination = "false"
    >
      <template #actions="{ record }">
        <a-button size="small" type="primary" @click="changeStatus(record, 2)">重置</a-button>
        &nbsp;
        <a-button size="small" @click="changeStatus(record, 3)">忽略</a-button>
      </template>

    </a-table>

    <space-end style="margin-top:24px;">
      <a-pagination
        v-model:current="curPage"
        :total="total"
        :page-size="3"
        @change="setPage"
       />
    </space-end>

    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
  
</style>