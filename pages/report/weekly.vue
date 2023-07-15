<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">ホーム画面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report' }">提出</el-breadcrumb-item>
      <el-breadcrumb-item>週報</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mb-secounday">
      <template #header>
        <div class="card-header">
          <span>週報</span>
        </div>
      </template>
      <el-alert class="mb-secounday" title="入力欄はMarkdown文法をサポートできます。" :closable="false" type="info" />
      <table class="tbl weekly-tbl">
        <tr>
          <th>期間</th>
          <td>
            <el-date-picker
              v-model="form.range"
              type="daterange"
              range-separator="〜"
              start-placeholder="開始日"
              end-placeholder="終了日"
              :disabled-date="disabledDate"
            />
          </td>
        </tr>
        <tr>
          <th>作業内容</th>
          <td><Editor v-model="form.workContent" /></td>
        </tr>
        <tr>
          <th>課題と解決策</th>
          <td><Editor v-model="form.problemSolution" /></td>
        </tr>
        <tr>
          <th>学びと気づき</th>
          <td><Editor v-model="form.realization" /></td>
        </tr>
        <tr>
          <th>報告・相談事項</th>
          <td><Editor v-model="form.talk" /></td>
        </tr>
      </table>
      <div class="mt-main text-center">
        <el-button size="large" @click="back">戻る</el-button>
        <el-button size="large" type="primary" @click="save">保存</el-button>
        <el-button size="large" type="success" @click="submit">保存して提出</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { useReportStore } from '~/stores/report.store';
  import { initWeeklyForm } from '~/types/weekly.type';

  const router = useRouter();
  const reportStore = useReportStore();
  const form = reactive(initWeeklyForm());
  const disabledDate = (time: Date) => {
    return !dateUtil.inMonth(reportStore.year, reportStore.month, time);
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

<style scoped lang="scss">
  .weekly-tbl {
    th {
      width: 150px;
      text-align: left;
    }
  }
</style>
