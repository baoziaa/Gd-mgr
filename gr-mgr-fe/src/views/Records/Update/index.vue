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
          <a-input v-model:value="editForm.stuid" />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="性别">
          <!-- <a-input v-model:value="editForm.sex" /> -->
          <a-radio-group name="sex" v-model:value="editForm.sex">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
           </a-radio-group>
        </a-form-item>
        <a-form-item label="专业">
          <a-input v-model:value="editForm.major" />
        </a-form-item>
        <a-form-item label="班级">
          <a-input v-model:value="editForm.gclass" />
        </a-form-item>
        <a-form-item label="毕业日期">
          <a-date-picker v-model:value="editForm.graddate" />
        </a-form-item>
        <a-form-item label="毕业去向">
          <a-input v-model:value="editForm.grad" />
        </a-form-item>
        <a-form-item label="去向城市">
          <a-input v-model:value="editForm.city" />
        </a-form-item>
        <a-form-item label="单位名称">
          <a-input v-model:value="editForm.unitname" />
        </a-form-item>
        <a-form-item label="单位性质">
          <a-input v-model:value="editForm.nature" />
        </a-form-item>
        <a-form-item label="单位行业">
          <a-input v-model:value="editForm.industry" />
        </a-form-item>
        <a-form-item label="所在地址">
          <a-input v-model:value="editForm.location" />
        </a-form-item>
        <a-form-item label="毕业薪资">
          <a-input v-model:value="editForm.salary" />
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input v-model:value="editForm.tel" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>