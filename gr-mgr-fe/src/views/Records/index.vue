<template>
  <div>
    <a-card
      :title="simple ? '最近添加的数据' : '数据列表'"
    >
      <div v-if="!simple">
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
          <a-button
            @click="show = true"
          >添加一条</a-button>
        </space-between>

        <a-divider />
      </div>
      <a-table
      :columns="columns"
      :data-source="list"
      :pagination = "false"
      :scroll="{ x: 'calc(700px + 81%)', y: 340 }"
      bordered
      >
        <template #classify="{ record }">
          {{ getDestinationClassifiyTitleById(record.grad) }}
        </template>

        <template #graddate="data">
          {{formatTimestamp(data.record.graddate)}}
        </template>

        <template #actions="arecord" v-if="!simple">
          <a href="javascript:;" @click="update(arecord)">编辑</a>
          &nbsp;
          <a href="javascript:;" v-only-admin @click="confirmBox(arecord)">删除</a>
          <br />
          <a href="javascript:;" @click="toDetail(arecord)">详情</a>
        </template>
      </a-table>
      <space-between style="margin-top: 24px;" v-if="!isSearch">
        <div />
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
          v-if="!simple"
        />
      </space-between>
    </a-card>

    <add-one
      v-model:show="show"
      :classifyList="DestinationClassifiyList"
      @getList="getList"
    />
    <update
      v-model:show="showUpdateModel"
      :record = "curEditRecord"
      @update="updateCurRecord"
      @getList="getList"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss'

</style>
