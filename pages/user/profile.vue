<template>
  <div>
    <el-card class="mb-secounday">
      <template #header>
        <div class="card-header">
          <span>ユーザ情報</span>
        </div>
      </template>
      <div class="profile-form">
        <el-alert
          v-if="employeeCode === undefined"
          title="初回ログイン時に社員番号をご入力ください。"
          type="error"
          :closable="false"
        />
        <div class="mt-main d-flex justify-content-center">
          <el-avatar shape="square" :size="100" :src="form.picture">
            <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
          </el-avatar>
          <el-form ref="formRef" class="flex-grow-1" :model="form" :rules="rules" label-width="150px">
            <el-form-item label="社員番号" required>
              <el-input v-model="form.employeeCode" />
            </el-form-item>
            <el-form-item label="姓" required>
              <el-input v-model="form.family_name" />
            </el-form-item>
            <el-form-item label="名前" required>
              <el-input v-model="form.given_name" />
            </el-form-item>
            <el-form-item label="役職">
              <el-input :model-value="role" disabled />
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="mt-main text-center">
        <el-button size="large">戻る</el-button>
        <el-button size="large" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { FormRules } from 'element-plus';
  import { useIndexStore } from '~/stores/index.store';
  import { UserInfo } from '~/types/user.type';

  definePageMeta({
    layout: 'empty'
  });

  const indexStore = useIndexStore();
  const employeeCode = indexStore.user?.employeeCode;
  const role = computed(() => (indexStore.user?.role ? ConstUtil.DIRECTOR_MAP[indexStore.user?.role] : '役職なし'));
  const form = reactive({
    employeeCode: indexStore.user?.employeeCode ?? '',
    family_name: indexStore.user?.family_name ?? '',
    given_name: indexStore.user?.given_name ?? '',
    picture: indexStore.user?.picture
  });
  const rules = reactive<FormRules<UserInfo>>({});
</script>

<style lang="scss" scoped>
  .profile-form {
    width: 600px;
    min-width: 600px;
    margin: 0 auto;
  }
</style>
