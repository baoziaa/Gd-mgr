<template>
  <div>
    <!-- visible控制modal的显示隐藏 -->
    <a-modal
      title="添加一个用户"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <!-- label-col表单左边占的宽度 :wrapper-col="{ span: 18 }"-->
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="账户">
          <a-input v-model:value="addForm.account" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model:value="addForm.password" />
        </a-form-item>
        <a-form-item label="角色">
          <!-- {{addForm.character}} -->
          <a-select
            v-model:value="addForm.character"
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
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>