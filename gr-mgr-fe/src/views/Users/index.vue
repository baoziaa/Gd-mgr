<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
           placeholder="根据账户搜索"
           enter-button
           v-model:value="keyword"
           @search="onSearch"
            />
          <!-- javascript:;防止点击的时候页面会跳转 -->
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
      <a-button @click="showAddModel = true">添加用户</a-button>
      </space-between>


      <a-divider />

      <div>
        <a-table
        :pagination="false"
        :columns="columns"
        :data-source="list"
        bordered>

        <template #createdAt="{ record }">
            {{formatTimestampDetail(record.meta.createdAt)}}
        </template>

        <template #character="{ record }">
            <a href="javascript:;" @click="onEdit(record)"><EditOutlined /></a>
            {{ getCharacterInfoById(record.character).title }}
        </template>

        <template #actions="{ record }">
           <a href="javascript:;" @click="resetPassword(record)">重置密码</a>
           &nbsp;
           <a href="javascript:;" @click="confirmBox(record)">删除</a>
        </template>

        </a-table>
      </div>

      <space-end style="margin-top: 24px;" v-if="!isSearch">
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="3"
          @change="setPage"
         />
      </space-end>
    </a-card>

    <add-one
      v-model:show="showAddModel"
      @getList="getUser"
    />

    <a-modal
      v-model:visible="showEditCharacterModal"
      title="修改角色"
      @ok="updateCharacter"
    >
      <a-select
        v-model:value="editForm.character"
        style="width: 140px"
      >
        <a-select-option
          v-for="item in characterInfo"
          :key="item._id"
          :value="item._id"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>