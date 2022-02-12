<template>
  <div>
    <a-card title="去向分类管理">
      <div>
        <a-input
          v-model:value="title"
         placeholder="输入去向分类"
         style="width:180px;"
        ></a-input>
        &nbsp;
        <a-button type="primary" @click="add">添加</a-button>
      </div>

      <a-divider />

      <div>
        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        >
        <template #actions="{ record }">
          <a-button size="small" type="danger" @click="remove(record)">删除</a-button>
        </template>
        
        </a-table>
      </div>
    </a-card>




    
  </div>
</template>

<script src="./index.js"></script>