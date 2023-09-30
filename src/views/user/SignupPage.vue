<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>社員情報登録</span>
      </div>
    </template>
    <el-form ref="formEl" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="社員番号" prop="id" required>
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="入社日" prop="hireDate" required>
        <el-date-picker
          v-model="form.hireDate"
          type="date"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="苗字" prop="familyName" required>
        <el-input v-model="form.familyName" />
      </el-form-item>
      <el-form-item label="名前" prop="givenName" required>
        <el-input v-model="form.givenName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> 登録 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { useHttp } from '@/hooks';
import { useGlobalStore } from '@/stores/global.store';
import { Const, TRIGGERS } from '@/utils';
import { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const { post } = useHttp();
const router = useRouter();
const globalStore = useGlobalStore();
const formEl = ref<FormInstance>();
const form = reactive({
  id: '',
  hireDate: '',
  familyName: globalStore.info?.familyName,
  givenName: globalStore.info?.givenName,
});

const rules: FormRules<any> = {
  id: [
    { required: true, message: '社員番号は必須です', trigger: TRIGGERS.SUBMIT },
    { min: 6, max: 6, message: '社員番号は6桁です', trigger: TRIGGERS.SUBMIT },
  ],
  hireDate: [
    { required: true, message: '入社日は必須です', trigger: TRIGGERS.SUBMIT },
  ],
  familyName: [
    { required: true, message: '苗字は必須です', trigger: TRIGGERS.SUBMIT },
  ],
  givenName: [
    { required: true, message: '名前は必須です', trigger: TRIGGERS.SUBMIT },
  ],
};

const submitForm = async () => {
  await formEl.value!.validate(async (valid, _fields) => {
    if (valid) {
      const result = await post<{ accessToken: string }>('/user/signup', form, {
        withGlobalLoading: true,
      });
      globalStore.accessToken = result.data.accessToken;
      globalStore.info!.signupStatus = Const.FINISH;
      router.replace('/');
    }
  });
};
</script>

<style scoped lang="scss">
.box-card {
  width: 400px;
  margin: 0 auto;
}
</style>
