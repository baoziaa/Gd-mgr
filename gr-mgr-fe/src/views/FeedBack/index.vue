<template>
  <div>
    <a-card title="留言板管理">
      <div>
        <a-textarea
         v-model:value="substance"
         placeholder="输入留言内容"
         style="width:100%;height:130px;"
        ></a-textarea>
        <br/>
        <a-button type="primary" class="btn" @click="add">添加</a-button>
      </div>

      <a-divider />

      <div>
        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        >
        <template #CreateTime="{ record }" >
          <div>
            {{formatTimestampDetail(record.meta.createdAt)}}
          </div>
        </template>
        
        <template #actions="{ record }">
          <a-button size="small" ghost type="primary" @click="updateSubstance(record)" style="margin-bottom:3px">修改</a-button>
          <br/>
          <a-button size="small" type="danger" @click="confirmBox(record)">删除</a-button>
        </template>
        
        </a-table>
      </div>
      <space-end style="margin-top: 24px;" v-if="!isSearch">
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
         />
      </space-end>
    </a-card>

  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';

</style>