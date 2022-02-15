<template>
  <div>
    <!-- visible控制modal的显示隐藏 -->
    <a-modal
      title="添加数据"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <!-- label-col表单左边占的宽度 :wrapper-col="{ span: 18 }"-->
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="学号">
          <a-input v-model:value="addForm.stuid" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="性别">
          <!-- <a-input v-model:value="addForm.sex" /> -->
          <a-radio-group name="sex" v-model:value="addForm.sex">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
           </a-radio-group>
        </a-form-item>
        <a-form-item label="专业">
          <a-input v-model:value="addForm.major" />
        </a-form-item>
        <a-form-item label="班级">
          <a-input v-model:value="addForm.gclass" />
        </a-form-item>
        <a-form-item label="毕业日期">
          <a-date-picker v-model:value="addForm.graddate" />
        </a-form-item>
        <!-- <a-form-item label="毕业去向">
          <a-input v-model:value="addForm.grad" />
        </a-form-item> -->
        <a-form-item label="毕业去向">
          <a-select
            v-model:value="addForm.grad"
            style="width: 120px"
          >
            <a-select-option
              v-for="item in store.destinationClassifiy"
              :key="item._id"
              :value="item._id">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="去向城市">
          <a-input v-model:value="addForm.city" />
        </a-form-item>
        <a-form-item label="单位名称">
          <a-input v-model:value="addForm.unitname" />
        </a-form-item>
        <a-form-item label="单位性质">
          <a-input v-model:value="addForm.nature" />
        </a-form-item>
        <a-form-item label="单位行业">
          <a-input v-model:value="addForm.industry" />
        </a-form-item>
        <a-form-item label="所在地址">
          <a-input v-model:value="addForm.location" />
        </a-form-item>
        <a-form-item label="毕业薪资">
          <a-input v-model:value="addForm.salary" />
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input v-model:value="addForm.tel" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>