<template>
  <div>
    <a-card title="修改密码">
      <a-form :model="form" :label-col="{ span:4 }" :wrapper-col="{ span:4 }">
        <a-form-item label="原始密码">
          <a-input-password v-model:value="resetPasswordFrom.oldPassword" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input-password v-model:value="resetPasswordFrom.newPassword" />
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input-password v-model:value="resetPasswordFrom.confirmNewPassword" />
          <div style="margin-top: 24px;">
            <a-button type="primary" @click="resetPassword">修改</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>


<script src="./index.js"></script>