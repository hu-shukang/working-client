<template>
  <div>
    <el-card class="mb-secounday">
      <template #header>
        <div class="card-header">
          <span>社員情報登録</span>
        </div>
      </template>
      <el-form :model="form" :rules="rules" label-width="150px">
        <el-form-item label="社員番号" prop="id">
          <el-input v-model="form.id" class="input-width-2" placeholder="社員番号" />
        </el-form-item>
        <el-form-item label="入社日" prop="date">
          <el-date-picker v-model="form.hireDate" type="date" placeholder="入社日" />
        </el-form-item>
        <el-form-item label="苗字" prop="familyName">
          <el-input v-model="form.familyName" class="input-width-2" placeholder="苗字" />
        </el-form-item>
        <el-form-item label="名前" prop="givenName">
          <el-input v-model="form.givenName" class="input-width-2" placeholder="名前" />
        </el-form-item>
      </el-form>
      <div class="mt-main text-center">
        <el-button size="large" type="primary">登録</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { FormRules } from 'element-plus';
  import { EmployeeSignupForm } from 'types/user.type';
  import { useIndexStore } from '~/stores/index.store';

  definePageMeta({
    layout: 'empty'
  });

  const indexStore = useIndexStore();
  const employeeInfo = indexStore.employeeInfo;
  const form = reactive({
    id: '',
    hireDate: undefined,
    familyName: employeeInfo?.familyName,
    givenName: employeeInfo?.givenName
  });
  const rules = reactive<FormRules<EmployeeSignupForm>>({});
</script>

<style lang="scss" scoped>
  .input-width-2 {
    width: 300px !important;
  }
</style>
