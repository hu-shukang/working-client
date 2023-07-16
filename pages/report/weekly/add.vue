<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report' }">提出</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report/weekly' }">週報一覧</el-breadcrumb-item>
      <el-breadcrumb-item>新規作成</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mb-secounday">
      <template #header>
        <div class="card-header">
          <span>週報新規作成</span>
          <span class="tip">※入力欄はMarkdown文法をサポートできます。</span>
        </div>
      </template>
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="期間" prop="range" required>
          <el-date-picker
            v-model="form.range"
            type="daterange"
            range-separator="〜"
            start-placeholder="開始日"
            end-placeholder="終了日"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item label="作業内容" prop="workContent" required>
          <Editor v-model="form.workContent" @blur="validateField('workContent')" />
        </el-form-item>
        <el-form-item label="課題と解決策" prop="problemSolution">
          <Editor v-model="form.problemSolution" />
        </el-form-item>
        <el-form-item label="学びと気づき" prop="realization">
          <Editor v-model="form.realization" />
        </el-form-item>
        <el-form-item label="報告・相談事項" prop="talk">
          <Editor v-model="form.talk" />
        </el-form-item>
      </el-form>
      <div class="mt-main text-center">
        <el-button size="large" @click="back">戻る</el-button>
        <el-button size="large" type="primary" @click="save">保存</el-button>
        <el-button size="large" type="success" @click="submit">保存して提出</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { FormInstance } from 'element-plus';
  import { useReportStore } from '~/stores/report.store';
  import { initWeeklyAddModel } from '~/types/weekly.type';

  const router = useRouter();
  const reportStore = useReportStore();
  const form = reactive(initWeeklyAddModel());
  const formRef = ref<FormInstance>();
  const disabledDate = (time: Date) => {
    return !dateUtil.inMonth(reportStore.year, reportStore.month, time);
  };
  const validateField = (field: string) => {
    formRef.value!.validateField(field);
  };
  const back = () => {
    ElMessageBox.confirm('保存せずに戻りますか？', 'ご確認', {
      confirmButtonText: 'OK',
      cancelButtonText: '続けて編集する',
      type: 'warning'
    })
      .then(() => {
        router.push('/report');
      })
      .catch(() => {});
  };

  const save = () => {
    ElMessageBox.confirm('保存しました', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
      showCancelButton: false
    }).then(() => {
      router.push('/report');
    });
  };

  const submit = () => {
    ElMessageBox.confirm('保存して提出しますか？', 'ご確認', {
      confirmButtonText: 'OK',
      cancelButtonText: '続けて編集する',
      type: 'info'
    })
      .then(() => {
        router.push('/report');
      })
      .catch(() => {});
  };
</script>
