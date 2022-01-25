<template>
  <div>
    <a-card>
      <space-between>
        <h2>姓名:&nbsp;&nbsp;{{detailInfo.name}}</h2>
        <div>
          <a-button size="small" type="primary" @click="showUpdateModel=true">编辑</a-button>
          &nbsp;
          <a-button size="small" type="danger" @click="confirmBox">删除</a-button>
        </div>
      </space-between>

      <a-divider/>

      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">学号</div>
            <div class="content">{{detailInfo.stuid}}</div>
          </div>
          <div class="item">
            <div class="title">性别</div>
            <div class="content">{{detailInfo.sex}}</div>
          </div>
          <div class="item">
            <div class="title">专业</div>
            <div class="content">{{detailInfo.major}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">班级</div>
            <div class="content">{{detailInfo.gclass}}</div>
          </div>
          <div class="item">
            <div class="title">毕业日期</div>
            <div class="content">{{formatTimestamp(detailInfo.graddate)}}</div>
          </div>
          <div class="item">
            <div class="title">毕业去向</div>
            <div class="content">{{detailInfo.grad}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">去向城市</div>
            <div class="content">{{detailInfo.city}}</div>
          </div>
          <div class="item">
            <div class="title">单位名称</div>
            <div class="content">{{detailInfo.unitname}}</div>
          </div>
          <div class="item">
            <div class="title">单位性质</div>
            <div class="content">{{detailInfo.nature}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">单位行业</div>
            <div class="content">{{detailInfo.industry}}</div>
          </div>
          <div class="item">
            <div class="title">所在地址</div>
            <div class="content">{{detailInfo.location}}</div>
          </div>
          <div class="item">
            <div class="title">毕业薪资</div>
            <div class="content">{{detailInfo.salary}}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">联系电话</div>
            <div class="content">{{detailInfo.tel}}</div>
          </div>
          <div class="item">
            <div class="title">创建日期</div>
            <div class="content">{{formatTimestampDetail(su.createdAt)}}</div>
          </div>
          <div class="item">
            <div class="title">更新日期</div>
            <div class="content">{{formatTimestampDetail(su.updatedAt)}}</div>
          </div>
        </div>
      </div>
    </a-card>

    <div class="log">
      <a-card title="日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter('EDIT_RECORD')">
            <FormOutlined v-if="curLogType ==='EDIT_RECORD'"/>
              修改日志
            </a>
          </span>
          <span style="margin-left: 12px">
            <a href="javascript:;" @click="logFilter('DEL_RECORD')">
            <DeleteOutlined v-if="curLogType ==='DEL_RECORD'"/>
              删除日志
            </a>
          </span>
        </template>
        <div>
          <a-table bordered :pagination="false"/>
        </div>

        <space-between style="margin-top: 24px;">
          <div/>
          <a-pagination />
        </space-between>
      </a-card>
    </div>
    <update
      v-model:show="showUpdateModel"
      :record = "detailInfo"
      @update="update"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';

</style>