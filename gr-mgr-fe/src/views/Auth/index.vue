<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="../../../public/logo.png" alt="">
      <h2 class="title">毕业生去向管理 后台</h2>
    </div>
    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登入">
          <div class="item">
          <a-input size="large"
           placeholder="账户"
           v-model:value="loginForm.account"
           >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
          </div>
          <div class="item">
          <a-input-password
           size="large"
            placeholder="密码"
            v-model:value="loginForm.password"
            >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
          </div>
          <div class="item">
            <a href="">忘记密码</a>
          </div>
          <div class="item">
            <a-button size="large" type="primary" @click="login">
              登入
            </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
          <a-input
            size="large"
            placeholder="账户"
            v-model:value="regForm.account"
            >
            <!-- 双向绑定了账户 -->
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
          </div>
          <div class="item">
          <a-input-password
            size="large"
            placeholder="密码"
            v-model:value="regForm.password"
            >
            <!-- 双向绑定了密码 -->
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
          </div>
          <div class="item">
          <a-input size="large" placeholder="邀请码">
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
          </div>
          <div class="item">
            <!-- 给按钮绑定了点击事件 -->
            <a-button @click="register" size="large" type="primary">
              注册
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scpoed>
  @import './index.scss';
</style>
